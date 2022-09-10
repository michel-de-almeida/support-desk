import { vaildateJWT } from '../helpers/helpers'
import expressAsyncHandler from 'express-async-handler'
import { UserModel } from '../models/userModel'
import { StatusCodes } from 'http-status-codes'

const protect = expressAsyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // Verify token
            const decoded = vaildateJWT(token)

            // Get user from token
            if (decoded) {
                req.user = await UserModel.findById(decoded.userId).select(
                    '-password'
                )
            }

            if (!req.user) {
                res.status(StatusCodes.UNAUTHORIZED)
                throw new Error('User not found')
            }

            next()
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED)
        throw new Error('Not authorized')
    }
})

export { protect }
