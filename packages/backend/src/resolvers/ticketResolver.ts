import { Role, UserModel } from '../entities/userEntity'
import { AppContext } from '../interfaces'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Note, Ticket, TicketModel } from '../entities/ticketEntity'
import { CreateTicket, UpdateTicket, TicketResponse, TicketsResponse } from './types/ticket-IO'

@Resolver(Ticket)
export class TicketResolver {
    @Authorized()
    @Query(() => TicketsResponse, {
        description: 'Returns the tickets that the currently logged user has submitted',
    })
    async getUserTickets(@Ctx() { req }: AppContext): Promise<TicketsResponse> {
        const tickets = await TicketModel.find({ 'userDoc._id': req.session.userId })

        if (!tickets) throw Error('An error occured while attempting to fetch tickets')

        return { tickets: tickets }
    }

    @Authorized(Role.Admin)
    @Query(() => TicketsResponse, {
        description: 'Returns all tickets in the collection. Admin only',
    })
    async getTickets(): Promise<TicketsResponse> {
        const tickets = await TicketModel.find()

        if (!tickets) throw Error('An error occured while attempting to fetch tickets')

        return { tickets: tickets }
    }

    @Authorized()
    @Query(() => TicketResponse, { description: 'Returns the Ticket with the given Id' })
    async getTicket(@Arg('ticketId') id: string): Promise<TicketResponse> {
        if (!id) {
            return {
                errors: [{ field: 'ticketId', message: 'Please provide a ticket id' }],
            }
        }
        const ticket = await TicketModel.findById(id)

        if (!ticket) {
            return {
                errors: [{ field: 'Id', message: 'Ticket with the given Id was not found' }],
            }
        }

        return { ticket: ticket }
    }

    @Authorized()
    @Mutation(() => TicketResponse, { description: 'Creates a ticket' })
    async setTicket(
        @Arg('ticket') options: CreateTicket,
        @Ctx() { req }: AppContext
    ): Promise<TicketResponse> {
        const response = {} as TicketResponse
        if (!options.product) {
            response.errors?.push({ field: 'product', message: 'Please provide a product' })
        }

        if (!options.description) {
            response.errors?.push({ field: 'description', message: 'Please provide a description' })
            //return { success: false, errors: [{field:'description', message: 'Please provide a description' }] }
        }

        if (response.errors) return response

        const user = await UserModel.findById(req.session.userId)
        const ticket: Ticket = {
            ...options,
            userDoc: user!,
        }
        const newTicket = await TicketModel.create(ticket)

        if (!newTicket) throw Error('An error occured while attempting to create a ticket')

        return { ticket: newTicket }
    }

    @Authorized()
    @Mutation(() => TicketResponse, { description: 'Creates a note for the given ticket' })
    async setTicketNote(
        @Arg('ticketId') id: string,
        @Arg('note') noteText: string,
        @Ctx() { req }: AppContext
    ): Promise<TicketResponse> {
        const user = await UserModel.findById(req.session.userId)
        const note: Note = { noteText: noteText, createdBy: user!, createdAt: new Date() }
        const ticket = await TicketModel.findByIdAndUpdate(
            id,
            { $push: { notes: note } },
            { new: true }
        )

        if (!ticket) throw Error('An error occured while attempting to add a note')

        return { ticket: ticket }
    }

    @Authorized()
    @Mutation(() => TicketResponse, { description: 'Updates a ticket' })
    async updateTicket(@Arg('ticket') options: UpdateTicket): Promise<TicketResponse> {
        if (!options.id) {
            return {
                errors: [{ field: 'id', message: 'Please provide the ticketId' }],
            }
        }

        const ticketExists = await TicketModel.findById(options.id)

        if (!ticketExists) throw Error('Ticket not found')

        const updatedTicket = await TicketModel.findByIdAndUpdate(options.id, options, {
            new: true,
            runValidators: true,
        })

        if (!updatedTicket) throw Error('An error occured while attempting to update the ticket')

        return { ticket: updatedTicket }
    }

    @Authorized()
    @Mutation(() => TicketResponse, { description: 'Deletes a ticket' })
    async deleteTicket(@Arg('ticketId') id: string): Promise<TicketResponse> {
        if (!id) {
            return {
                errors: [{ field: 'ticketId', message: 'Please provide a ticket id' }],
            }
        }
        const ticket = await TicketModel.findByIdAndDelete(id)

        if (!ticket) throw Error('Ticket not found')

        return {}
    }
}
