import jwt, { JwtPayload } from 'jsonwebtoken'
import { IResponseData } from 'support-desk-shared'

const vaildateJWT = (token: string | undefined) => {
    // Verify token
    if (token) {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as JwtPayload
            return decoded
        } catch (error) {
            return false
        }
    }
    return false
}

const getResponseMessage = (
    success: boolean,
    message?: string,
    payload?: any
): IResponseData => {
    return {
        success: success,
        message: message,
        payload: payload,
    }
}

export { vaildateJWT, getResponseMessage }
