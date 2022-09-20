import { Role, User } from '../../entities/userEntity'
import { InputType, Field, ObjectType } from 'type-graphql'
import { FieldError } from './errorOutput'

@InputType()
export class UserRegInput implements Partial<User> {
    @Field({ nullable: false })
    username!: string

    @Field({ nullable: false })
    email!: string

    @Field({ nullable: false })
    password!: string

    @Field(() => [Role], { nullable: true })
    roles?: Role[]
}

@InputType()
export class UserLoginInput implements Partial<User> {
    @Field({ nullable: false })
    email!: string

    @Field({ nullable: false })
    password!: string
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User
}
