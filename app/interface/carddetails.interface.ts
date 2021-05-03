import { InputType, Field} from "type-graphql";
// import { IBillingDetails } from "./billing.interface";

@InputType()
export class CardDetailsInput {
    @Field()
    number: string;

    @Field()
    cvv: string;

    @Field()
    expMonth: number;

    @Field()
    expYear: number;

    @Field()
    users_email:string

    @Field()
    amount: string;

    @Field()
    currency:string

    @Field()
    billing_details_name:string

    @Field()
    billing_details_city:string

    @Field()
    billing_details_country:string

    @Field()
    billing_details_address_line1:string

    @Field()
    billing_details_postal_code:string


}
