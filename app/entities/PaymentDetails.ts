import { ObjectType, Field, ID} from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { Ref } from "../generic_type";
import { User } from "./User";

@ObjectType({ description: "The  Card model" })
export  class PaymentDetails {
    @Field(() => ID)
    id: string;  

    @Field()
    @Property({ required: true })
    payment_id: String;

    @Field()
    @Property({ required: true })
    status: String;

    @Field()
    @Property({ required: true })
    amount: string;

    @Field()
    @Property({ required: true })
    currrency: string;

   
    @Field()
    @Property({ required: false })
    user_email: string;

    @Field(_type => String)
    @Property({ ref: User, required: true })
    user: Ref<User>;
    _doc: any;

}

