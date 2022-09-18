import { Role, User } from '../../entities/userEntity'
import { InputType, Field, ObjectType } from 'type-graphql'
import { FieldError } from './errorOutput'

@InputType()
export class UserRegInput implements Partial<User> {
    @Field()
    username!: string

    @Field()
    email!: string

    @Field()
    password!: string

    @Field(() => Role)
    role?: Role
}

@InputType()
export class UserLoginInput implements Partial<User> {
    @Field()
    email!: string

    @Field()
    password!: string
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User
}
