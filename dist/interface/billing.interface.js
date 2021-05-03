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
exports.IMetaData = exports.IBillingDetails = void 0;
const type_graphql_1 = require("type-graphql");
let IBillingDetails = class IBillingDetails {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IBillingDetails.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IBillingDetails.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IBillingDetails.prototype, "country", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IBillingDetails.prototype, "line1", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IBillingDetails.prototype, "line2", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IBillingDetails.prototype, "district", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IBillingDetails.prototype, "postalCode", void 0);
IBillingDetails = __decorate([
    type_graphql_1.InterfaceType()
], IBillingDetails);
exports.IBillingDetails = IBillingDetails;
class IMetaData {
}
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IMetaData.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], IMetaData.prototype, "phone", void 0);
exports.IMetaData = IMetaData;
//# sourceMappingURL=billing.interface.js.map