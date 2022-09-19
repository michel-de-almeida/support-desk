import { UserModel } from '../entities/userEntity'
import { IAppContext } from '../interfaces'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Ticket, TicketModel } from '../entities/ticketEntity'
import {
    CreateTicketInput,
    UpdateTicketInput,
    TicketResponse,
    TicketsResponse,
    CreateNote,
} from './types/ticket-IO'

@Resolver(Ticket)
export class TicketResolver {
    @Query(() => TicketsResponse)
    async userTickets(@Ctx() { req }: IAppContext): Promise<TicketsResponse> {
        const tickets = await TicketModel.find({ 'userDoc._id': req.session.userId })

        if (!tickets) {
            return {
                success: false,
                errors: [{ message: 'An error occured while attempting to fetch tickets' }],
            }
        }
        return { success: true, tickets: tickets }
    }

    @Query(() => TicketsResponse)
    async tickets(): Promise<TicketsResponse> {
        const tickets = await TicketModel.find()

        if (!tickets) {
            return {
                success: false,
                errors: [{ message: 'An error occured while attempting to fetch tickets' }],
            }
        }
        return { success: true, tickets: tickets }
    }

    @Query(() => TicketResponse, { nullable: true })
    async getTicket(@Arg('ticketId') id: string): Promise<TicketResponse> {
        if (!id) {
            return {
                success: false,
                errors: [{ field: 'ticketId', message: 'Please provide a ticket id' }],
            }
        }
        const ticket = await TicketModel.findById(id)

        if (!ticket) {
            return { success: false, errors: [{ message: 'Ticket not found' }] }
        }

        return { success: true, ticket: ticket }
    }

    @Mutation(() => TicketResponse)
    async setTicket(
        @Arg('ticket') options: CreateTicketInput,
        @Ctx() { req }: IAppContext
    ): Promise<TicketResponse> {
        if (!options.product) {
            return { success: false, errors: [{ message: 'Please provide a product' }] }
        }

        if (!options.description) {
            return { success: false, errors: [{ message: 'Please provide a description' }] }
        }

        const user = await UserModel.findById(req.session.userId)
        const ticket: Ticket = {
            ...options,
            userDoc: user!,
        }
        const newTicket = await TicketModel.create(ticket)

        if (!newTicket) {
            return {
                success: false,
                errors: [{ message: 'An error occured while attempting to create a ticket' }],
            }
        }

        return { success: true, ticket: newTicket }
    }

    @Mutation(() => TicketResponse)
    async setTicketNote(
        @Arg('ticketId') id: string,
        @Arg('note') note: CreateNote
    ): Promise<TicketResponse> {
        const ticket = await TicketModel.findByIdAndUpdate(
            id,
            { $push: { notes: note } },
            { new: true }
        )

        if (!ticket) {
            return { success: false, errors: [{ message: 'Error adding note' }] }
        }

        return { success: true, ticket: ticket }
    }

    @Mutation(() => TicketResponse)
    async updateTicket(@Arg('ticket') options: UpdateTicketInput): Promise<TicketResponse> {
        if (!options.id) {
            return { success: false, errors: [{ message: 'Please provide the ticketId' }] }
        }

        if (!options.product) {
            return { success: false, errors: [{ message: 'Please provide a product' }] }
        }

        if (!options.description) {
            return { success: false, errors: [{ message: 'Please provide a description' }] }
        }

        const ticketExists = await TicketModel.findById(options.id)

        if (!ticketExists) {
            return { success: false, errors: [{ message: 'Ticket not found' }] }
        }

        const updatedTicket = await TicketModel.findByIdAndUpdate(options.id, options, {
            new: true,
            runValidators: true,
        })

        if (!updatedTicket) {
            return {
                success: false,
                errors: [{ message: 'An error occured while attempting to update the ticket' }],
            }
        }

        return { success: true, ticket: updatedTicket }
    }

    @Mutation(() => TicketResponse, { nullable: true })
    async deleteTicket(@Arg('ticketId') id: string): Promise<TicketResponse> {
        if (!id) {
            return {
                success: false,
                errors: [{ field: 'ticketId', message: 'Please provide a ticket id' }],
            }
        }
        const ticket = await TicketModel.findByIdAndDelete(id)

        if (!ticket) {
            return { success: false, errors: [{ message: 'Ticket not found' }] }
        }

        return { success: true }
    }
}
