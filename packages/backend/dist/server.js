"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./config/db");
const helloResolver_1 = require("./resolvers/helloResolver");
const type_graphql_1 = require("type-graphql");
const userResolver_1 = require("./resolvers/userResolver");
;
(async () => {
    dotenv_1.default.config();
    const port = process.env.PORT || 5000;
    (0, db_1.connectDB)();
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({ resolvers: [helloResolver_1.HelloResolver, userResolver_1.UserResolver] }),
    });
    await server.start();
    server.applyMiddleware({ app });
    if (process.env.NODE_ENV === 'prod') {
        app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
        app.get('*', (_req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../../frontend/build/index.html'));
        });
    }
    else {
        app.get('/', (_req, res) => {
            res.status(200).json({ message: 'Welcome to support desk API' });
        });
    }
    app.listen(port, () => {
        console.log(`Express listening on port ${port}`);
        console.log(`GraphQL running at http://localhost:${port}${server.graphqlPath}`);
    });
})();
//# sourceMappingURL=server.js.map