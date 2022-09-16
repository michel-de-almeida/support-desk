"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStatus = exports.TicketType = exports.API_URLS = void 0;
var API_URLS;
(function (API_URLS) {
    API_URLS["Users"] = "/api/users";
    API_URLS["Tickets"] = "/api/tickets";
    API_URLS["Notes"] = "/api/notes";
})(API_URLS = exports.API_URLS || (exports.API_URLS = {}));
var TicketType;
(function (TicketType) {
    TicketType["Tires"] = "Tires";
    TicketType["Engine"] = "Engine";
    TicketType["FuelPump"] = "Fuel Pump";
    TicketType["FrontWing"] = "Front Wing";
    TicketType["RearWing"] = "Rear Wing";
})(TicketType = exports.TicketType || (exports.TicketType = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["Submitted"] = "Submitted";
    TicketStatus["Open"] = "Open";
    TicketStatus["Closed"] = "Closed";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
