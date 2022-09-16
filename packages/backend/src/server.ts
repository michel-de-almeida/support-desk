import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import ticketRouter from './routes/ticketRoutes'
import noteRouter from './routes/noteRoute'
import cors from 'cors'
import errorHandler from './middleware/errorMiddleware'
import { connectDB } from './config/db'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

dotenv.config()
connectDB()
const port = process.env.port || 5000
const api = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))
api.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }))
api.options('*', () => cors())

api.use('/api/users', userRouter)
api.use('/api/tickets', ticketRouter)
api.use('/api/notes', noteRouter)
api.use(errorHandler)

api.listen(port, () => {
    console.log(`listening on port ${port}`)
})
