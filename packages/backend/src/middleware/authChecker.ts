import { UserModel } from '../entities/userEntity'
import { ResolverData, AuthChecker } from 'type-graphql'
import { IAppContext } from '../interfaces'

export const customAuthChecker: AuthChecker<IAppContext> = async (
    { context }: ResolverData<IAppContext>,
    roles
) => {
    if (roles.length === 0) {
        // if `@Authorized()`, check only if user exists
        return context.req.session.userId !== undefined
    }

    if (!context.req.session.userId) {
        return false
    }

    const userRoles = await UserModel.findById(context.req.session.userId, { roles: 1, _id: 0 })
    if (userRoles!.roles.some((role) => roles.includes(role))) {
        // grant access if the roles overlap
        return true
    }

    // no roles matched, restrict access
    return false
}
