import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { connectDB } from './config/db'
import errorHandler from './middleware/errorMiddleware'
import noteRouter from './routes/noteRoute'
import ticketRouter from './routes/ticketRoutes'
import userRouter from './routes/userRoutes'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

dotenv.config()
const port = process.env.PORT || 5000
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRouter)
app.use('/api/tickets', ticketRouter)
app.use('/api/notes', noteRouter)
app.use(errorHandler)

if (process.env.NODE_ENV === 'prod') {
    app.use(express.static(path.join(__dirname, '../../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.status(200).json({ message: 'Welcome to support desk API' })
    })
}

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
