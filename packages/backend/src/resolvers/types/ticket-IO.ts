import { InputType, Field, ObjectType } from 'type-graphql'
import { Ticket, TicketStatus, TicketType } from '../../entities/ticketEntity'
import { FieldError } from './errorOutput'

@InputType()
export class CreateTicket implements Partial<Ticket> {
    @Field(() => TicketType, { nullable: false })
    public product!: TicketType

    @Field({ nullable: false })
    public description!: string
}

@InputType()
export class UpdateTicket implements Partial<Ticket> {
    @Field({ nullable: false })
    id!: string

    @Field(() => TicketType, { nullable: true })
    public product?: TicketType

    @Field({ nullable: true })
    public description?: string

    @Field(() => TicketStatus, { nullable: true })
    public status?: TicketStatus
}

@ObjectType()
export class TicketResponse {
    @Field()
    success!: boolean

    @Field(() => Ticket, { nullable: true })
    ticket?: Ticket

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
}

@ObjectType()
export class TicketsResponse {
    @Field()
    success!: boolean

    @Field(() => [Ticket], { nullable: true })
    tickets?: Ticket[]

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
}
