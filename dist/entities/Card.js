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
exports.CardDetails = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = require("./User");
let CardDetails = class CardDetails {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], CardDetails.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], CardDetails.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], CardDetails.prototype, "card_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], CardDetails.prototype, "expMonth", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], CardDetails.prototype, "expYear", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], CardDetails.prototype, "network", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], CardDetails.prototype, "last4", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], CardDetails.prototype, "billing_details_name", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], CardDetails.prototype, "billing_details_city", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], CardDetails.prototype, "billing_details_country", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], CardDetails.prototype, "billing_details_address_line1", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: false }),
    __metadata("design:type", String)
], CardDetails.prototype, "billing_details_postal_code", void 0);
__decorate([
    type_graphql_1.Field(_type => String),
    typegoose_1.prop({ ref: User_1.User, required: true }),
    __metadata("design:type", Object)
], CardDetails.prototype, "user", void 0);
CardDetails = __decorate([
    type_graphql_1.ObjectType({ description: "The  Card model" })
], CardDetails);
exports.CardDetails = CardDetails;
//# sourceMappingURL=Card.js.map