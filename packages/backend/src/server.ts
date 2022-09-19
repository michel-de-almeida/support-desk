import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import 'reflect-metadata'
import { connectDB } from './config/db'
//import errorHandler from './middleware/errorMiddleware'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import connectRedis from 'connect-redis'
import session from 'express-session'
import Redis from 'ioredis'
import { buildSchema } from 'type-graphql'
import { IAppContext } from './interfaces'
import { TicketResolver } from './resolvers/ticketResolver'
import { UserResolver } from './resolvers/userResolver'
import { customAuthChecker } from './middleware/authChecker'

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}
;(async () => {
    dotenv.config()
    const port = process.env.PORT || 5000
    connectDB()
    const app = express()
    app.set('trust proxy', 1)

    //redis
    const RedisStore = connectRedis(session)
    const redis = new Redis()

    app.use(
        session({
            name: 'qid',
            store: new RedisStore({ client: redis, disableTouch: true }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'prod', // cookie only works in https
                sameSite: 'lax', //csrf
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET as string,
            resave: false,
        })
    )

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, TicketResolver],
            emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
            authChecker: customAuthChecker,
        }),
        context: ({ req, res }): IAppContext => ({ req, res }),
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    })
    await server.start()

    server.applyMiddleware({
        app,
        cors: {
            origin: ['https://studio.apollographql.com'],
            credentials: true,
        },
    })
    //app.use(errorHandler)

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
        console.log(`GraphQL running at http://localhost:${port}${server.graphqlPath}`)
    })
})()

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// app.use('/api/users', userRouter)
// app.use('/api/tickets', ticketRouter)
// app.use('/api/notes', noteRouter)
