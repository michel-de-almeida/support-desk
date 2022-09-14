import { TicketStatus } from '../enums'

export interface ITicket {
    _id?: string
    userId: string
    product: string
    description: string
    status?: TicketStatus
    createdAt?: string
}
