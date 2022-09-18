import { InputType, Field } from 'type-graphql'
import { Ticket, TicketType } from '../../entities/ticketEntity'

@InputType()
export class TicketInput implements Partial<Ticket> {
    //@ts-ignore
    @Field((type) => TicketType)
    public product!: TicketType

    @Field()
    public description!: string
}
