"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./config/db");
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const apollo_server_express_1 = require("apollo-server-express");
dotenv_1.default.config();
const port = process.env.PORT || 5000;
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const typeDefs = (0, apollo_server_express_1.gql) `
    type Query {
        hello: String
    }
`;
const resolvers = {
    Query: { hello: () => 'bruh' },
};
const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers, csrfPrevention: true, cache: 'bounded' });
server.start().then(() => server.applyMiddleware({ app }));
app.use('/api/users', userRoutes_1.default);
app.use('/api/tickets', ticketRoutes_1.default);
app.use('/api/notes', noteRoute_1.default);
app.use(errorMiddleware_1.default);
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
    console.log(`Apollo server on http://localhost:${port}${server.graphqlPath}`);
});
//# sourceMappingURL=server.js.map