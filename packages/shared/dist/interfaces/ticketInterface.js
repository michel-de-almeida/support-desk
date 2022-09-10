"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTicket = void 0;
var enums_1 = require("../enums");
var initTicket = function () {
    return {
        id: '',
        userId: '',
        product: '',
        description: '',
        status: enums_1.TicketStatus.Submitted,
    };
};
exports.initTicket = initTicket;
