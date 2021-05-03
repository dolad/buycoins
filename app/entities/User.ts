import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { Ref } from "../generic_type";
import {Transaction} from "./Transaction";

@ObjectType({ description: "The User model" })
export class User {

    @Field(() => ID)
    id: number;  

    @Field()
    @Property({ required: true })
    first_name: String;

    @Field()
    @Property({ required: true })
    last_name: String;

    @Field()
    @Property({ required: true })
    email: String;

    @Field()
    @Property({ required: true })
    phone?: String;

    @Field(_type => String)
    @Property({ ref:() => Transaction})
    transactions_id?: Ref<Transaction>
    _doc: any;
}

