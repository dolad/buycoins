"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const openpgp = __importStar(require("openpgp"));
const CirclesPayment_services_1 = require("./CirclesPayment.services");
const uuid_1 = require("uuid");
const shared_1 = require("../shared/shared");
const atob_1 = __importDefault(require("atob"));
const btoa_1 = __importDefault(require("btoa"));
class Encrypt {
    encryptCardDetail(dataToEncrypt) {
        return __awaiter(this, void 0, void 0, function* () {
            const circleInstance = new CirclesPayment_services_1.CirclePaymentService();
            const pciEncryptionKey = yield circleInstance.getPublicKey();
            try {
                const decodedPublicKey = atob_1.default(pciEncryptionKey.data.publicKey);
                const publicKey = yield openpgp.readKey({ armoredKey: decodedPublicKey });
                const options = {
                    message: yield openpgp.createMessage({ 'text': JSON.stringify(dataToEncrypt) }),
                    publicKeys: publicKey
                };
                return openpgp.encrypt(options).then((ciphertext) => {
                    return {
                        encryptedData: btoa_1.default(ciphertext),
                        keyId: pciEncryptionKey.data.keyId
                    };
                });
            }
            catch (error) {
                return error.message;
            }
        });
    }
    idempotencyKey() {
        return uuid_1.v4();
    }
    hashSessionID(userID) {
        // using userID as session for now
        return shared_1.hashData(userID);
    }
}
exports.Encrypt = Encrypt;
//# sourceMappingURL=Encrypt.js.map