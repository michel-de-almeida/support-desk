import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Ticket, TicketModel } from '../entities/ticketEntity'
import { TicketInput } from './types/ticket-IO'

@Resolver(Ticket)
export class TicketResolver {
    @Query(() => Ticket, { nullable: true })
    ticket(@Arg('id') id: string) {
        return TicketModel.findById(id)
    }

    @Query(() => [Ticket])
    async tickets(): Promise<Ticket[]> {
        return await TicketModel.find()
    }

    @Mutation(() => TicketModel)
    async setTicket(@Arg('ticket') options: TicketInput): Promise<Ticket> {
        const ticket: Ticket = {
            ...options,
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
