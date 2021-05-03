"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDetailsModel = exports.TransactionModel = exports.UserModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
const Transaction_1 = require("./Transaction");
const Card_1 = require("./Card");
exports.UserModel = typegoose_1.getModelForClass(User_1.User);
exports.TransactionModel = typegoose_1.getModelForClass(Transaction_1.Transaction);
exports.CardDetailsModel = typegoose_1.getModelForClass(Card_1.CardDetails);
//# sourceMappingURL=model.js.map