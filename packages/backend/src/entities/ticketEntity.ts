import { prop, getModelForClass } from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'
import { User } from '../entities/userEntity'

export enum TicketType {
    Tires = 'Tires',
    Engine = 'Engine',
    FuelPump = 'Fuel Pump',
    FrontWing = 'Front Wing',
    RearWing = 'Rear Wing',
}
registerEnumType(TicketType, { name: 'TicketType', description: 'The type of ticket' })

export enum TicketStatus {
    Submitted = 'Submitted',
    Open = 'Open',
    Closed = 'Closed',
}
registerEnumType(TicketStatus, { name: 'TicketStatus', description: 'The status of the ticket' })

@ObjectType()
export class Note {
    @Field()
    @prop({ required: [true, 'Please enter a note'] })
    noteText!: string

    @Field()
    @prop({ required: true })
    public createdBy!: User
}

@ObjectType()
export class Ticket {
    @Field(() => ID)
    readonly _id?: string

    @Field(() => User)
    @prop({ required: true })
    public userDoc!: User

    @Field(() => TicketType)
    @prop({ required: [true, 'Please select a product'], enum: TicketType })
    public product!: TicketType

    @Field()
    @prop({ required: [true, 'Please enter a description of the issue'] })
    public description!: string

    @Field(() => TicketStatus)
    @prop({ required: true, enum: TicketStatus, default: TicketStatus.Submitted })
    public status?: TicketStatus

    @Field(() => [Note], { nullable: true })
    @prop({ type: () => [Note] })
    public notes?: Note[]

    @Field({ nullable: true })
    public createdAt?: Date

    @Field({ nullable: true })
    public updatedAt?: Date
}

export const TicketModel = getModelForClass(Ticket, { schemaOptions: { timestamps: true } })
