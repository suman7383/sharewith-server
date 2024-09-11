import express, { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongooseSanitize from 'express-mongo-sanitize'
import router from './router'
import connectDB from './connections/db'
import {
    apiError,
    ERROR_TYPE,
    ErrorResponse,
    serverError
} from './utils/errorHandling/errorResponse'
import { sendErrorResponse } from './utils/errorHandling'
import logger from './utils/logger'
import cookieParser from 'cookie-parser'
import config from './config/config'
import passport from 'passport'
import { googlePassportStrategy } from './middleware/auth'

const app = express()

//< ---------- Middlewares ------------- >
app.use(cookieParser())
app.use(morgan('short'))
app.use(helmet())
app.use(
    express.json({
        limit: '1mb'
    })
)

app.use(
    cors({
        credentials: true,
        origin: config.FRONTEND_URL
    })
)
app.use(
    express.urlencoded({
        limit: '1mb',
        extended: false
    })
)

app.use(mongooseSanitize({ replaceWith: '_' }))

app.use(passport.initialize())
passport.use('google', googlePassportStrategy)

//connections
connectDB()
    .then(() => {})
    .catch((err: unknown) => {
        logger.error('Error connecting to db', {
            meta: {
                err
            }
        })
    })

//routers
app.use(router)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
    throw apiError(new Error('Route not found'), ERROR_TYPE.NOT_FOUND)
})

//error handling here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    logger.error('An error occured!', {
        meta: {
            err
        }
    })

    if (err instanceof ErrorResponse) {
        sendErrorResponse(res, err)
    } else {
        sendErrorResponse(res, serverError(err))
    }
})

process.on('uncaughtException', (err) => {
    logger.error('uncaught Execption', {
        meta: {
            err
        }
    })

    process.exit(1)
})

process.on('unhandledRejection', (err) => {
    throw err
})

export { app }
