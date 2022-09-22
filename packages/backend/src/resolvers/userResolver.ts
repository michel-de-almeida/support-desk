import { Arg, Mutation, Resolver, Ctx, Query, Authorized } from 'type-graphql'
import { UserLoginInput, UserRegInput, UserResponse } from './types/user-IO'
import { Role, User, UserModel } from '../entities/userEntity'
import argon2 from 'argon2'
import { AppContext } from '../interfaces'
import { COOKIE_NAME } from '../constants'

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse, { description: 'Creates a new User' })
    async register(
        @Arg('options') options: UserRegInput,
        @Ctx() { req }: AppContext
    ): Promise<UserResponse> {
        // Find if user already exists and return an error if it does
        const userExists = await UserModel.findOne({ email: options.email })

        if (userExists) {
            return { errors: [{ field: 'email', message: 'Account already exists' }] }
        }

        if (!options.password) {
            return { errors: [{ field: 'password', message: 'Password cannot be empty' }] }
        }

        //hash password
        const hashedPassword = await argon2.hash(options.password)
        //create user
        const user: User = {
            email: options.email,
            password: hashedPassword,
            username: options.username,
            roles: options.roles! && options.roles!,
        }

        const newUser = await UserModel.create(user)

        if (!newUser) throw Error('An error occoured while creating your account. Please try again')

        req.session.userId = newUser.id

        return { user: newUser }
    }

    @Mutation(() => UserResponse, { description: 'Signs a user in' })
    async login(
        @Arg('options') options: UserLoginInput,
        @Ctx() { req }: AppContext
    ): Promise<UserResponse> {
        // Find the user
        const user = await UserModel.findOne({ email: options.email })

        if (!user) {
            return {
                errors: [
                    {
                        field: 'email',
                        message: 'Account with this email does not exist. Please create an account',
                    },
                ],
            }
        }

        //Validate password
        const isPasswordValid = await argon2.verify(user.password, options.password)

        if (!isPasswordValid) {
            return { errors: [{ field: 'password', message: 'Invalid password' }] }
        }

        req.session.userId = user.id

        return { user: user }
    }

    @Authorized()
    @Query(() => User, { description: 'Returns the currently logged user' })
    async me(@Ctx() { req }: AppContext): Promise<User> {
        const user = await UserModel.findById(req.session.userId)

        return user!
    }

    @Authorized()
    @Query(() => [Role], { description: 'Returns the roles assigned to the currently logged user' })
    async getUserRoles(@Ctx() { req }: AppContext): Promise<Role[]> {
        const user = await UserModel.findById(req.session.userId, { roles: 1, _id: 0 })

        return user?.roles!
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: AppContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME)
                if (err) {
                    console.log(err)
                    resolve(false)
                    return
                }

                resolve(true)
            })
        )
    }
}
