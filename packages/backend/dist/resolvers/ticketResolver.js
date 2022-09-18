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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketResolver = void 0;
const type_graphql_1 = require("type-graphql");
const ticketEntity_1 = require("../entities/ticketEntity");
const ticket_IO_1 = require("./types/ticket-IO");
let TicketResolver = class TicketResolver {
    ticket(id) {
        return ticketEntity_1.TicketModel.findById(id);
    }
    async tickets() {
        return await ticketEntity_1.TicketModel.find();
    }
    async setTicket(options) {
        const ticket = {
            ...options,
            userRef: undefined,
        };
        const newTicket = ticketEntity_1.TicketModel.create(ticket);
        return newTicket;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => ticketEntity_1.Ticket, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketResolver.prototype, "ticket", null);
__decorate([
    (0, type_graphql_1.Query)(() => [ticketEntity_1.Ticket]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "tickets", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => ticketEntity_1.TicketModel),
    __param(0, (0, type_graphql_1.Arg)('ticket')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_IO_1.TicketInput]),
    __metadata("design:returntype", Promise)
], TicketResolver.prototype, "setTicket", null);
TicketResolver = __decorate([
    (0, type_graphql_1.Resolver)(ticketEntity_1.Ticket)
], TicketResolver);
exports.TicketResolver = TicketResolver;
//# sourceMappingURL=ticketResolver.js.map