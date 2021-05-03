import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import * as dotenv from 'dotenv';
import {maybeGetuserIpAddress} from './shared/shared'
// resolvers
import {UserResolver} from "./resolvers/user";
import {CardResolver} from "./resolvers/card";
// import {CategoriesResolver} from "./resolvers/category";
// import {CartResolver} from "./resolvers/cart";
// import {OrderResolver} from "./resolvers/order";

const main = async () => {
const schema = await buildSchema({
   resolvers: [  UserResolver, CardResolver ],
    emitSchemaFile: true,
    validate: false,
  });

dotenv.config();

// create mongoose connection
const mongoose = await connect('mongodb://localhost:27017/buycoina', {useNewUrlParser: true, useUnifiedTopology: true});
await mongoose.connection;

const server = new ApolloServer( {schema, context: (req) => {
    const ctx = {
      req,
      userIp:maybeGetuserIpAddress(req)
    };
    return ctx;
  },});
const app = Express();


server.applyMiddleware({app});
app.listen({ port: 3333 }, () =>
  console.log(`🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`))
};
main().catch((error)=>{
    console.log(error, 'error');
})
