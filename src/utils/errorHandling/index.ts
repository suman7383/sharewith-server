import { Response } from 'express'
import { ErrorResponse } from './errorResponse'

export const sendErrorResponse = (res: Response, err: ErrorResponse) => {
    return res.status(err.statusCode).json({ ...err })
}
