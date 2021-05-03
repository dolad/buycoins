import {Request} from './Request.services';
import config from '../config/app'
import {Encrypt} from '../services/Encrypt';
import {TransactionModel} from '../entities/model';


export class CirclePaymentService extends Request {
    constructor(){
        super();
        this.token = `Bearer ${config().circle.apiKey}`;
        this.baseURL = `${config().circle.baseUrl}`;
    }
    public async getPublicKey():Promise<any>{
        return await this.fetchRequest('/v1/encryption/public','GET')
    }
    public async createCard(data:any, userId:string):Promise<any>{
        try {
           const result = await this.geneateAllCardPaymentData(data,userId) 
            const response = await this.fetchRequest('/v1/cards', "POST", result);
            const {id} = response.data;
            
            const payres = await this.createCardPayment(result,id, data.amount, data.currency);
            const transaction = await TransactionModel.create({
                payment_id:payres.data.id,
                status:payres.data.status,
                amount:payres.data.amount.amount,
                currrency:payres.data.amount.currency,
                source:payres.data.source.id,
                user_email:payres.data.metadata.email,
                trackingRef:"null",
                user:userId
            })
            await transaction.save();
            return {response, transaction};
        } catch (error) {
            return {"error" :error}
        }
    }

    public async createCardPayment(data:any, id:string, amount:string, currency:string):Promise<any>{
        try {
            const {metadata,idempotencyKey} = data;
            const paymentPayload : any = {
                verification:"none",
                amount:{
                    amount:amount,
                    currency:currency,
                },
                metadata,
                idempotencyKey,
                source:{
                    id:id,
                    type:"card"
                }
            }
            return await this.fetchRequest('/v1/payments',"POST", paymentPayload);
           
        } catch (error) {
            return error;
        }
    }
    public async retrieveCardPayment(id:string):Promise<any>{
        try {
            return await this.fetchRequest(`/v1/payments/${id}`, "GET")
        } catch (error) {
            return error
        }
        
    }
    public async  geneateAllCardPaymentData(cardInput:any, userId:string):Promise<any>{
        const cardData = {
            number :cardInput.number,
            cvv: cardInput.cvv
         }
        
         const encrypt = new Encrypt();
         const {keyId, encryptedData} = await encrypt.encryptCardDetail(cardData);
          const idempotencyKey = encrypt.idempotencyKey();
          const sessionId = encrypt.hashSessionID(userId)
          const staticIP="23.30.51.65";
          const billingDetails = {
              name:cardInput.billing_details_name,
              city:cardInput.billing_details_city,
              country:cardInput.billing_details_country,
              line1:cardInput.billing_details_address_line1,
              postalCode:cardInput.billing_details_postal_code
          }
          const metadata = {
              email:cardInput.users_email,
              sessionId,
              ipAddress:staticIP
          }
          return {
              expMonth:cardInput.expMonth,
              expYear:cardInput.expYear,
              metadata,
              billingDetails,
              encryptedData,
              idempotencyKey,
              keyId
          }
    }
}