import mongoose from 'mongoose'
import { TicketStatus, TicketType } from 'support-desk-shared'

const ticketSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: String,
            required: [true, 'Please select a product'],
            enum: TicketType,
        },
        description: {
            type: String,
            required: [true, 'Please enter a description of the issue'],
        },
        status: {
            type: String,
            required: true,
            enum: TicketStatus,
            default: TicketStatus.Submitted,
        },
    },
    {
        timestamps: true,
    }
)

const TicketModel = mongoose.model('Ticket', ticketSchema)

export { TicketModel }
