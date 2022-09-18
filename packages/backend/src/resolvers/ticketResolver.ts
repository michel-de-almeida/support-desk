import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Ticket, TicketModel } from '../entities/ticketEntity'
import { TicketInput } from './types/ticket-input'

@Resolver(Ticket)
export class TicketResolver {
    @Query((returns) => Ticket, { nullable: true })
    ticket(@Arg('id') id: string) {
        return TicketModel.findById(id)
    }

    @Query((returns) => [Ticket])
    async tickets(): Promise<Ticket[]> {
        return await TicketModel.find()
    }

    @Mutation((returns) => TicketModel)
    async setTicket(@Arg('ticket') ticketInput: TicketInput): Promise<Ticket> {
        const ticket: Ticket = {
            ...ticketInput,
            userRef: undefined,
        }
        const newTicket = TicketModel.create(ticket)
        // const recipe = new RecipeModel({
        //     ...recipeInput,
        //     author: user._id,
        // } as Recipe)

        // await recipe.save()
        return newTicket
    }
}
