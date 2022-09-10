"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStatus = exports.TicketType = void 0;
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
    TicketStatus["Closed"] = "closed";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
