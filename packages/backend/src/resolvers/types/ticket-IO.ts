import { InputType, Field, ObjectType } from 'type-graphql'
import { Ticket, TicketStatus, TicketType } from '../../entities/ticketEntity'
import { FieldError } from './errorOutput'

@InputType()
export class CreateTicketInput implements Partial<Ticket> {
    //@ts-ignore
    @Field(() => TicketType)
    public product!: TicketType

    @Field()
    public description!: string
}

@InputType()
export class UpdateTicketInput implements Partial<Ticket> {
    @Field()
    id!: string

    @Field(() => TicketType)
    public product!: TicketType

    @Field()
    public description!: string

    @Field(() => TicketStatus, { nullable: true })
    public status?: TicketStatus
}

@ObjectType()
export class TicketResponse {
    @Field()
    success: boolean

    @Field(() => Ticket, { nullable: true })
    ticket?: Ticket

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
}

@ObjectType()
export class TicketsResponse {
    @Field()
    success: boolean

    @Field(() => [Ticket], { nullable: true })
    tickets?: Ticket[]

    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]
}
