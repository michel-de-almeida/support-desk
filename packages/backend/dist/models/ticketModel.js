"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const support_desk_shared_1 = require("support-desk-shared");
const ticketSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: support_desk_shared_1.TicketType,
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue'],
    },
    status: {
        type: String,
        required: true,
        enum: support_desk_shared_1.TicketStatus,
        default: support_desk_shared_1.TicketStatus.Submitted,
    },
}, {
    timestamps: true,
});
const TicketModel = mongoose_1.default.model('Ticket', ticketSchema);
exports.TicketModel = TicketModel;
//# sourceMappingURL=ticketModel.js.map