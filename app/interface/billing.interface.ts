import {  Field, InterfaceType} from "type-graphql";

@InterfaceType()
export  class IBillingDetails { 
    @Field()
    name: string;
    @Field()
    city:String;
    @Field()
    country:String;
    @Field()
    line1:String;
    @Field()
    line2?:String;
    @Field()
    district?:String;
    @Field()
    postalCode?:string
  }


export  class IMetaData {
    @Field()
    email: string;
    @Field()
    phone:String;
  
  }