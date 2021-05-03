import * as openpgp from 'openpgp';
import { CirclePaymentService } from './CirclesPayment.services';
import { v4 as uuidv4 } from 'uuid';
import {hashData} from '../shared/shared';
import atob from  "atob";
import btoa from "btoa"

export interface CardDetails {
    number?: string,    
    cvv?: string      
 }
   
interface EncryptedValue {
    encryptedData: string,
    keyId: string
   }
   

export class Encrypt {

    async encryptCardDetail(dataToEncrypt:CardDetails) :Promise<EncryptedValue> {
        const circleInstance = new CirclePaymentService();
        const pciEncryptionKey = await circleInstance.getPublicKey();
        try {
            const decodedPublicKey = atob(pciEncryptionKey.data.publicKey);
            const publicKey = await openpgp.readKey({ armoredKey: decodedPublicKey});
            const options = {
                message: await openpgp.createMessage( {'text': JSON.stringify(dataToEncrypt)}),
                publicKeys: publicKey
            }
            return openpgp.encrypt(options).then((ciphertext) => {
                return {
                  encryptedData: btoa(ciphertext),
                  keyId: pciEncryptionKey.data.keyId
                }
              })
        } catch (error) {
            return error.message
        }
    }

    public idempotencyKey():string {
        return uuidv4();
    }

    public hashSessionID(userID:string):string{
        return hashData(userID)
    }


}