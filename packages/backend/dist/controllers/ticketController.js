"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../helpers/utils");
const ticketModel_1 = require("../models/ticketModel");
const getTickets = (0, express_async_handler_1.default)(async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const tickets = await ticketModel_1.TicketModel.find();
            res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, tickets));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
    else {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error('Action reserved for admin users only');
    }
});
const getUserTickets = (0, express_async_handler_1.default)(async (req, res) => {
    const userId = req.user.id;
    if (userId) {
        try {
            const userTickets = await ticketModel_1.TicketModel.find({ userId: userId });
            res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, userTickets));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error('Invalid user login. Please login and try again');
    }
});
const getTicket = (0, express_async_handler_1.default)(async (req, res) => {
    const ticketId = req.params.id;
    if (ticketId) {
        try {
            const ticket = await ticketModel_1.TicketModel.findById(ticketId);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, ticket));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
});
const setTicket = (0, express_async_handler_1.default)(async (req, res) => {
    const ticket = req.body;
    if (ticket) {
        ticket.userId = req.user.id;
        try {
            const newTicket = await ticketModel_1.TicketModel.create(ticket);
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, 'Ticket created', {
                ticketId: newTicket.id,
            }));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
});
const deleteTicket = (0, express_async_handler_1.default)(async (req, res) => {
    const ticketId = req.params.id;
    if (ticketId) {
        try {
            await ticketModel_1.TicketModel.findByIdAndDelete(ticketId);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, 'Ticket deleted'));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Ticket does not exist');
        }
    }
});
const updateTicket = (0, express_async_handler_1.default)(async (req, res) => {
    const ticket = req.body;
    if (ticket) {
        try {
            await ticketModel_1.TicketModel.findByIdAndUpdate(ticket._id, ticket, {
                new: true,
                runValidators: true,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, 'Ticket updated'));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
});
exports.TicketController = {
    getTickets,
    getUserTickets,
    getTicket,
    setTicket,
    deleteTicket,
    updateTicket,
};
//# sourceMappingURL=ticketController.js.map