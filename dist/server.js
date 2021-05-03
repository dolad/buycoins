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
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
const dotenv = __importStar(require("dotenv"));
const shared_1 = require("./shared/shared");
// resolvers
const user_1 = require("./resolvers/user");
const card_1 = require("./resolvers/card");
// import {CategoriesResolver} from "./resolvers/category";
// import {CartResolver} from "./resolvers/cart";
// import {OrderResolver} from "./resolvers/order";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield type_graphql_1.buildSchema({
        resolvers: [user_1.UserResolver, card_1.CardResolver],
        emitSchemaFile: true,
        validate: false,
    });
    dotenv.config();
    // create mongoose connection
    const mongoose = yield mongoose_1.connect('mongodb://localhost:27017/buycoina', { useNewUrlParser: true, useUnifiedTopology: true });
    yield mongoose.connection;
    const server = new apollo_server_express_1.ApolloServer({ schema, context: (req) => {
            const ctx = {
                req,
                userIp: shared_1.maybeGetuserIpAddress(req)
            };
            return ctx;
        }, });
    const app = express_1.default();
    server.applyMiddleware({ app });
    app.listen({ port: 3333 }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`));
});
main().catch((error) => {
    console.log(error, 'error');
});
//# sourceMappingURL=server.js.map