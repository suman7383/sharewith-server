import jwt from 'jsonwebtoken'
import config from '../config/config'
import logger from './logger'
import { JWT_EXPIRE_IN } from '../constant/application'

export const generateToken = (data: Record<string, unknown>) => {
    if (!config.JWT_SECRET) {
        logger.error('JWT_SECRET is not defined', {
            meta: {
                err: 'JWT_SECRET is not defined'
            }
        })

        throw new Error('JWT_SECRET is not defined')
    }

    return jwt.sign(data, config.JWT_SECRET, {
        expiresIn: JWT_EXPIRE_IN
    })
}

export const verifyToken = (token: string) => {
    if (!config.JWT_SECRET) {
        logger.error('JWT_SECRET is not defined', {
            meta: {
                err: 'JWT_SECRET is not defined'
            }
        })

        throw new Error('JWT_SECRET is not defined')
    }

    return jwt.verify(token, config.JWT_SECRET)
}
