"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CirclePaymentService = void 0;
const Request_services_1 = require("./Request.services");
const app_1 = __importDefault(require("../config/app"));
const Encrypt_1 = require("../services/Encrypt");
const model_1 = require("../entities/model");
class CirclePaymentService extends Request_services_1.Request {
    constructor() {
        super();
        this.token = `Bearer ${app_1.default().circle.apiKey}`;
        this.baseURL = `${app_1.default().circle.baseUrl}`;
    }
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.fetchRequest('/v1/encryption/public', 'GET');
        });
    }
    createCard(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.geneateAllCardPaymentData(data, userId);
                const response = yield this.fetchRequest('/v1/cards', "POST", result);
                const { id } = response.data;
                const payres = yield this.createCardPayment(result, id, data.amount, data.currency);
                console.log("payres", payres);
                const transaction = yield model_1.TransactionModel.create({
                    payment_id: payres.data.id,
                    status: payres.data.status,
                    amount: payres.data.amount.amount,
                    currrency: payres.data.amount.currency,
                    source: payres.data.source.id,
                    user_email: payres.data.metadata.email,
                    trackingRef: "null",
                    user: userId
                });
                yield transaction.save();
                return { response, transaction };
            }
            catch (error) {
                return { "error": error };
            }
        });
    }
    createCardPayment(data, id, amount, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { metadata, idempotencyKey } = data;
                const paymentPayload = {
                    verification: "none",
                    amount: {
                        amount: amount,
                        currency: currency,
                    },
                    metadata,
                    idempotencyKey,
                    source: {
                        id: id,
                        type: "card"
                    }
                };
                return yield this.fetchRequest('/v1/payments', "POST", paymentPayload);
            }
            catch (error) {
                return error;
            }
        });
    }
    retrieveCardPayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.fetchRequest(`/v1/payments/${id}`, "GET");
            }
            catch (error) {
                return error;
            }
        });
    }
    geneateAllCardPaymentData(cardInput, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardData = {
                number: cardInput.number,
                cvv: cardInput.cvv
            };
            const encrypt = new Encrypt_1.Encrypt();
            const { keyId, encryptedData } = yield encrypt.encryptCardDetail(cardData);
            const idempotencyKey = encrypt.idempotencyKey();
            const sessionId = encrypt.hashSessionID(userId);
            const staticIP = "23.30.51.65";
            const billingDetails = {
                name: cardInput.billing_details_name,
                city: cardInput.billing_details_city,
                country: cardInput.billing_details_country,
                line1: cardInput.billing_details_address_line1,
                postalCode: cardInput.billing_details_postal_code
            };
            const metadata = {
                email: cardInput.users_email,
                sessionId,
                ipAddress: staticIP
            };
            return {
                expMonth: cardInput.expMonth,
                expYear: cardInput.expYear,
                metadata,
                billingDetails,
                encryptedData,
                idempotencyKey,
                keyId
            };
        });
    }
}
exports.CirclePaymentService = CirclePaymentService;
//# sourceMappingURL=CirclesPayment.services.js.map