import {getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";
import {Transaction} from "./Transaction";
import {CardDetails} from './Card'
export const UserModel = getModelForClass(User);
export const TransactionModel = getModelForClass(Transaction);
export const CardDetailsModel = getModelForClass(CardDetails);
