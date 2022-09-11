"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTicket = exports.TicketType = exports.TicketStatus = void 0;
var enums_1 = require("./enums");
Object.defineProperty(exports, "TicketStatus", { enumerable: true, get: function () { return enums_1.TicketStatus; } });
Object.defineProperty(exports, "TicketType", { enumerable: true, get: function () { return enums_1.TicketType; } });
var ticketInterface_1 = require("./interfaces/ticketInterface");
Object.defineProperty(exports, "initTicket", { enumerable: true, get: function () { return ticketInterface_1.initTicket; } });
