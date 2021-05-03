import { Resolver, Mutation, Arg} from "type-graphql";
import { CardDetailsInput } from "../interface/carddetails.interface";
import {CardDetailsModel, TransactionModel} from '../entities/model'
import { CardDetails } from "../entities/Card";
import {UserModel} from '../entities/model';
import { CirclePaymentService } from "../services/CirclesPayment.services";
import { Transaction } from "../entities/Transaction";
@Resolver(_of => CardDetails) 
export class CardResolver {

    @Mutation(() => Transaction)
    async createPayment(@Arg("data") cardInput: CardDetailsInput): Promise<Transaction> { 
       const userID = await UserModel.findOne({email:cardInput.users_email});
       const circlePayment = new CirclePaymentService();
       const result = await circlePayment.createCard(cardInput,userID?.id) 
       const {id,status,last4,expMonth,expYear,network, billingDetails} = result?.response?.data;
        const card = await CardDetailsModel.create({      
          card_id:id,
          status,
          last4,
          expMonth,
          expYear,
          network,
          billing_details_name:billingDetails.name,
          billing_details_country:billingDetails.country,
          billing_details_city:billingDetails.city,
          billing_details_postal_code:billingDetails.postalCode,
          billing_details_address_line1:billingDetails.line1,
          user:userID
      });
      await card.save()
      return result.transaction;
    };

   @Mutation(() => Transaction)
   async verifyPayment(@Arg("payment_id") id: string) {
    const circlePayment = new CirclePaymentService();
    const result = await circlePayment.retrieveCardPayment(id);
    console.log(result);
    const update = {
        $set: {
          status: result.data.status,
          trackingRef:result.data.trackingRef
        },
      };
    const option = { upsert: true, returnNewDocument: true, new: true };
    const filter = {payment_id:id}
    return await TransactionModel.findOneAndUpdate(filter, update, option); ;
  }

}
