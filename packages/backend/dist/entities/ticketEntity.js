"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = exports.Ticket = exports.TicketStatus = exports.TicketType = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const userEntity_1 = require("../entities/userEntity");
var TicketType;
(function (TicketType) {
    TicketType["Tires"] = "Tires";
    TicketType["Engine"] = "Engine";
    TicketType["FuelPump"] = "Fuel Pump";
    TicketType["FrontWing"] = "Front Wing";
    TicketType["RearWing"] = "Rear Wing";
})(TicketType = exports.TicketType || (exports.TicketType = {}));
(0, type_graphql_1.registerEnumType)(TicketType, { name: 'TicketType', description: 'The type of ticket' });
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["Submitted"] = "Submitted";
    TicketStatus["Open"] = "Open";
    TicketStatus["Closed"] = "Closed";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
(0, type_graphql_1.registerEnumType)(TicketStatus, { name: 'TicketStatus', description: 'The status of the ticket' });
let Note = class Note {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: [true, 'Please enter a note'] }),
    __metadata("design:type", String)
], Note.prototype, "noteText", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => userEntity_1.User),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", userEntity_1.User)
], Note.prototype, "createdBy", void 0);
Note = __decorate([
    (0, type_graphql_1.ObjectType)()
], Note);
let Ticket = class Ticket {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Ticket.prototype, "_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => userEntity_1.User),
    (0, typegoose_1.prop)({ ref: () => userEntity_1.User, required: true }),
    __metadata("design:type", Object)
], Ticket.prototype, "userRef", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => TicketType),
    (0, typegoose_1.prop)({ required: [true, 'Please select a product'], enum: TicketType }),
    __metadata("design:type", String)
], Ticket.prototype, "product", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typegoose_1.prop)({ required: [true, 'Please enter a description of the issue'] }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => TicketStatus),
    (0, typegoose_1.prop)({ required: true, enum: TicketStatus, default: TicketStatus.Submitted }),
    __metadata("design:type", String)
], Ticket.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Note], { nullable: true }),
    (0, typegoose_1.prop)({ type: () => Note }),
    __metadata("design:type", Array)
], Ticket.prototype, "notes", void 0);
Ticket = __decorate([
    (0, type_graphql_1.ObjectType)()
], Ticket);
exports.Ticket = Ticket;
exports.TicketModel = (0, typegoose_1.getModelForClass)(Ticket, { schemaOptions: { timestamps: true } });
//# sourceMappingURL=ticketEntity.js.map