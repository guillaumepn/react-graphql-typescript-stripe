import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as session from 'express-session';
import {createConnection} from "typeorm";
import { ApolloServer } from 'apollo-server-express';

import {typeDefs} from "./typeDefs";
import {resolvers} from "./resolvers";
import {stripe} from "./stripe";

stripe;

const startServer = async () => {
    const server = new ApolloServer({
        // These will be defined for both new or existing servers
        typeDefs,
        resolvers,
        context: ({req}: any) => ({req})
    });

    try {
        await createConnection();
    } catch (e) {
        return console.log('Error', e)
    }

    const app = express();

    app.use(session({
        secret: 'sdfghtjykuyjthrger',
        resave: false,
        saveUninitialized: false
    }));

    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: 'http://localhost:3000'
        }
    }); // app is from an existing express app

    app.listen({ port: 4000 }, () =>
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    )
}

startServer();

