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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDetailsInput = void 0;
const type_graphql_1 = require("type-graphql");
// import { IBillingDetails } from "./billing.interface";
let CardDetailsInput = class CardDetailsInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "number", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "cvv", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CardDetailsInput.prototype, "expMonth", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], CardDetailsInput.prototype, "expYear", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "users_email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "amount", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "currency", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "billing_details_name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "billing_details_city", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "billing_details_country", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "billing_details_address_line1", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CardDetailsInput.prototype, "billing_details_postal_code", void 0);
CardDetailsInput = __decorate([
    type_graphql_1.InputType()
], CardDetailsInput);
exports.CardDetailsInput = CardDetailsInput;
//# sourceMappingURL=carddetails.interface.js.map