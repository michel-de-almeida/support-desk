import { ErrorRequestHandler } from 'express'
import { IResponseData } from 'support-desk-shared'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    const errorResponseMessage: IResponseData = {
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'prod' ? null : err.stack,
    }

    res.json(errorResponseMessage)
}

export default errorHandler
