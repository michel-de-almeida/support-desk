import jwt, { JwtPayload } from 'jsonwebtoken'

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

const getResponseMessage = (message: string, payload?: any) => {
    return {
        message: message,
        payload: payload,
    }
}

export { vaildateJWT, getResponseMessage }
