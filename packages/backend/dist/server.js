"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var db_1 = require("./config/db");
var errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
var noteRoute_1 = __importDefault(require("./routes/noteRoute"));
var ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
var port = process.env.PORT || 5000;
(0, db_1.connectDB)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/users', userRoutes_1.default);
app.use('/api/tickets', ticketRoutes_1.default);
app.use('/api/notes', noteRoute_1.default);
app.use(errorMiddleware_1.default);
if (process.env.NODE_ENV === 'prod') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend/build')));
    app.get('*', function (req, res) {
        res.sendFile(path_1.default.join(__dirname, '../../frontend/build/index.html'));
    });
}
else {
    app.get('/', function (req, res) {
        res.status(200).json({ message: 'Welcome to support desk API' });
    });
}
app.listen(port, function () {
    console.log("listening on port ".concat(port));
});
