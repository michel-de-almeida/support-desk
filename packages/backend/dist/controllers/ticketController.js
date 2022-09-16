"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var http_status_codes_1 = require("http-status-codes");
var utils_1 = require("../helpers/utils");
var ticketModel_1 = require("../models/ticketModel");
// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.
// @desc    Gets all tickets. Admin only
// @route   GET /api/tickets/
// @access  Private
var getTickets = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tickets, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.user.isAdmin) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.TicketModel.find()];
            case 2:
                tickets = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, tickets));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error(error_1);
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
                throw new Error('Action reserved for admin users only');
            case 6: return [2 /*return*/];
        }
    });
}); });
// @desc    Gets all tickets. Admin only
// @route   GET /api/tickets/user
// @access  Private
var getUserTickets = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userTickets, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                if (!userId) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.TicketModel.find({ userId: userId })];
            case 2:
                userTickets = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, userTickets));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error(error_2);
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error('Invalid user login. Please login and try again');
            case 6: return [2 /*return*/];
        }
    });
}); });
// @desc    Get ticket
// @route   GET /api/tickets/:id
// @access  Private
var getTicket = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, ticket, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticketId = req.params.id;
                if (!ticketId) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.TicketModel.findById(ticketId)];
            case 2:
                ticket = _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, ticket));
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error(error_3);
            case 4: return [2 /*return*/];
        }
    });
}); });
// @desc    Create ticket
// @route   POST /api/tickets
// @access  Private
var setTicket = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, newTicket, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticket = req.body;
                if (!ticket) return [3 /*break*/, 4];
                ticket.userId = req.user.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.TicketModel.create(ticket)];
            case 2:
                newTicket = _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, 'Ticket created', {
                    ticketId: newTicket.id,
                }));
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error(error_4);
            case 4: return [2 /*return*/];
        }
    });
}); });
// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
var deleteTicket = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticketId = req.params.id;
                if (!ticketId) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.TicketModel.findByIdAndDelete(ticketId)];
            case 2:
                _a.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, 'Ticket deleted'));
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error('Ticket does not exist');
            case 4: return [2 /*return*/];
        }
    });
}); });
// @desc    Update ticket
// @route   PUT /api/tickets/
// @access  Private
var updateTicket = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ticket = req.body;
                if (!ticket) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ticketModel_1.TicketModel.findByIdAndUpdate(ticket._id, ticket, {
                        new: true,
                        runValidators: true,
                    })];
            case 2:
                _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, 'Ticket updated'));
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error(error_6);
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.TicketController = {
    getTickets: getTickets,
    getUserTickets: getUserTickets,
    getTicket: getTicket,
    setTicket: setTicket,
    deleteTicket: deleteTicket,
    updateTicket: updateTicket,
};
