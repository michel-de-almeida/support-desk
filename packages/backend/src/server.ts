import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { connectDB } from './config/db'
import errorHandler from './middleware/errorMiddleware'
import { HelloResolver } from './resolvers/helloResolver'
import { buildSchema } from 'type-graphql'

declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

;(async () => {
    dotenv.config()
    const port = process.env.PORT || 5000
    connectDB()
    const app = express()

    const server = new ApolloServer({ schema: await buildSchema({ resolvers: [HelloResolver] }) })
    await server.start()
    server.applyMiddleware({ app })
    app.use(errorHandler)

    if (process.env.NODE_ENV === 'prod') {
        app.use(express.static(path.join(__dirname, '../../frontend/build')))

        app.get('*', (_req, res) => {
            res.sendFile(path.join(__dirname, '../../frontend/build/index.html'))
        })
    } else {
        app.get('/', (_req, res) => {
            res.status(200).json({ message: 'Welcome to support desk API' })
        })
    }

    app.listen(port, () => {
        console.log(`Express listening on port ${port}`)
    })
})()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use('/api/users', userRouter)
// app.use('/api/tickets', ticketRouter)
// app.use('/api/notes', noteRouter)
