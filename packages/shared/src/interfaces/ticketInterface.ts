import { TicketStatus } from '../enums'

export interface ITicket {
    id: string
    userId: string
    product: string
    description: string
    status?: string
}

export const initTicket = (): ITicket => {
    return {
        id: '',
        userId: '',
        product: '',
        description: '',
        status: TicketStatus.Submitted,
    }
}
