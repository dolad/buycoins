import { InputType, Field, ID } from "type-graphql";
import { Transaction } from "../entities/Transaction";
import { ObjectId } from "mongodb";
import { Length } from "class-validator";

@InputType()
export class TransactionInput implements Partial<Transaction> {

    @Field(()=> ID)
    user?: ObjectId;

    @Field()
    @Length(1, 255)
    status: String;

    @Field()
    payment_id: String;

    @Field()
    @Length(1, 255)
    description: String;

    @Field()
    cancel: any;

    @Field()
    refunds: any;

    @Field()
    fees: any;

}
