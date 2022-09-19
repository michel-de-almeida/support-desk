import { ResolverData, AuthChecker } from 'type-graphql'
import { IAppContext } from '../interfaces'

// export const customAuthChecker: AuthChecker<IAppContext> = (
//     { root, args, context, info }: ResolverData<IAppContext>,
//     roles
// ) => {
//     if(!context.req.session.userId) {
//         return false
//     }

//     return true
// }

export const customAuthChecker: AuthChecker<IAppContext> = ({
    context,
}: ResolverData<IAppContext>) => {
    if (!context.req.session.userId) {
        return false
    }

    return true
}
