import { InputType, Field, ObjectType, ID } from 'type-graphql'
import { Note, Ticket, TicketStatus, TicketType } from '../../entities/ticketEntity'
import { FieldError } from './errorOutput'

@InputType()
export class CreateTicketInput implements Partial<Ticket> {
    @Field(() => TicketType, { nullable: false })
    public product!: TicketType

    @Field({ nullable: false })
    public description!: string
}

@InputType()
export class UpdateTicketInput implements Partial<Ticket> {
    @Field({ nullable: false })
    id!: string

    @Field(() => TicketType, { nullable: false })
    public product!: TicketType

    @Field({ nullable: false })
    public description!: string

    @Field(() => TicketStatus, { nullable: true })
    public status?: TicketStatus
}

@InputType()
export class CreateNote implements Partial<Note> {
    @Field({ nullable: false })
    noteText!: string

    @Field(() => ID, { nullable: false })
    public createdBy!: string
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
