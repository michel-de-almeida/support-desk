import { prop, getModelForClass } from '@typegoose/typegoose'
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql'

export enum Role {
    Admin,
    User,
}

registerEnumType(Role, { name: 'Role', description: 'The user Role' })

@ObjectType()
export class User {
    @Field(() => ID)
    readonly _id?: string

    @Field()
    @prop({ required: [true, 'Please enter a username'] })
    public username!: string

    @Field()
    @prop({ required: [true, 'Please enter an email address'] })
    public email!: string

    @prop({ required: [true, 'Please enter a password'] })
    public password!: string

    @Field(() => Role)
    @prop({ required: [true, 'User role is requried'], enum: Role, default: Role.User })
    public role?: Role

    @Field({ nullable: true })
    @prop()
    public token?: string
}

export const UserModel = getModelForClass(User, { schemaOptions: { timestamps: true } })
