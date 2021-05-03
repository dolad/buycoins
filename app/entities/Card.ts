import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property } from "@typegoose/typegoose";
import { Ref } from "../generic_type";
import { User } from "./User";

@ObjectType({ description: "The  Card model" })
export class CardDetails {
    @Field(() => ID)
    id: string;

    @Field()
    @Property({ required: true })
    status: String;

    @Field()
    @Property({ required: true })
    card_id: String;

    @Field()
    @Property({ required: true })
    expMonth: number;

    @Field()
    @Property({ required: true })
    expYear: number;

    @Field()
    @Property({ required: true })
    network: string;

    @Field()
    @Property({ required: false })
    last4: string;

    @Field()
    @Property({ required: false })
    billing_details_name: string

    @Field()
    @Property({ required: false })
    billing_details_city: string

    @Field()
    @Property({ required: false })
    billing_details_country: string

    @Field()
    @Property({ required: false })
    billing_details_address_line1: string

    @Field()
    @Property({ required: false })
    billing_details_postal_code: string

    @Field(_type => String)
    @Property({ ref: User, required: true })
    user: Ref<User>;
    _doc: any;

}

