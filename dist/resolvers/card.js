"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardResolver = void 0;
const type_graphql_1 = require("type-graphql");
const carddetails_interface_1 = require("../interface/carddetails.interface");
const model_1 = require("../entities/model");
const Card_1 = require("../entities/Card");
const model_2 = require("../entities/model");
const CirclesPayment_services_1 = require("../services/CirclesPayment.services");
const Transaction_1 = require("../entities/Transaction");
let CardResolver = class CardResolver {
    createPayment(cardInput) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userID = yield model_2.UserModel.findOne({ email: cardInput.users_email });
            const circlePayment = new CirclesPayment_services_1.CirclePaymentService();
            const result = yield circlePayment.createCard(cardInput, userID === null || userID === void 0 ? void 0 : userID.id);
            console.log("_____", result);
            const { id, status, last4, expMonth, expYear, network, billingDetails } = (_a = result === null || result === void 0 ? void 0 : result.response) === null || _a === void 0 ? void 0 : _a.data;
            const card = yield model_1.CardDetailsModel.create({
                card_id: id,
                status,
                last4,
                expMonth,
                expYear,
                network,
                billing_details_name: billingDetails.name,
                billing_details_country: billingDetails.country,
                billing_details_city: billingDetails.city,
                billing_details_postal_code: billingDetails.postalCode,
                billing_details_address_line1: billingDetails.line1,
                user: userID
            });
            yield card.save();
            return result.transaction;
        });
    }
    ;
    verifyPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const circlePayment = new CirclesPayment_services_1.CirclePaymentService();
            const result = yield circlePayment.retrieveCardPayment(id);
            console.log(result);
            const update = {
                $set: {
                    status: result.data.status,
                    trackingRef: result.data.trackingRef
                },
            };
            const option = { upsert: true, returnNewDocument: true, new: true };
            const filter = { payment_id: id };
            return yield model_1.TransactionModel.findOneAndUpdate(filter, update, option);
            ;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Transaction_1.Transaction),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [carddetails_interface_1.CardDetailsInput]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "createPayment", null);
__decorate([
    type_graphql_1.Mutation(() => Transaction_1.Transaction),
    __param(0, type_graphql_1.Arg("payment_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CardResolver.prototype, "verifyPayment", null);
CardResolver = __decorate([
    type_graphql_1.Resolver(_of => Card_1.CardDetails)
], CardResolver);
exports.CardResolver = CardResolver;
//# sourceMappingURL=card.js.map