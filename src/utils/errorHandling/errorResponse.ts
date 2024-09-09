export type TErrData = {
    errMsg?: string
    generatedTime: string | Date
    msg: string
}

export enum ERROR_TYPE {
    BAD_REQUEST = 'BAD_REQUEST',
    SERVER_ERROR = 'SERVER_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
    NOT_FOUND = 'NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    NOT_ALLOWED = 'NOT_ALLOWED'
}

export type TErrorOptions = {
    status: number
    statusCode: number
    data: TErrData
    type: ERROR_TYPE
}

export class ErrorResponse extends Error {
    status: number
    statusCode: number
    data: TErrData
    type: ERROR_TYPE

    constructor(options: TErrorOptions) {
        super(options.data.msg)
        this.status = options.status
        this.statusCode = options.statusCode
        this.data = options.data
        this.type = options.type

        // Set the prototype explicitly.
        Error.captureStackTrace(this, this.constructor)
        Object.setPrototypeOf(this, ErrorResponse.prototype)
        Object.freeze(this)
    }
}

export const serverError = (
    err: Error,
    message: string = 'Internal Server Error'
) => {
    return new ErrorResponse({
        statusCode: 500,
        type: ERROR_TYPE.SERVER_ERROR,
        status: 0,
        data: {
            generatedTime: new Date().toISOString(),
            msg: message
        }
    })
}

export const apiError = (
    err: Error,
    type: ERROR_TYPE,
    message?: string,
    statusCode?: number
) => {
    return new ErrorResponse({
        type,
        statusCode: statusCode || 404,
        status: 0,
        data: {
            errMsg: err.message,
            generatedTime: new Date().toISOString(),
            msg: message || 'NOT FOUND'
        }
    })
}

export const authError = (err: Error, message: string, statusCode?: number) => {
    return new ErrorResponse({
        type: ERROR_TYPE.UNAUTHORIZED,
        statusCode: statusCode || 401,
        status: 0,
        data: {
            errMsg: err.message,
            generatedTime: new Date().toISOString(),
            msg: message
        }
    })
}

export const validationError = (
    err: Error,
    message: string,
    statusCode?: number
) => {
    return new ErrorResponse({
        type: ERROR_TYPE.VALIDATION_ERROR,
        statusCode: statusCode || 400,
        status: 0,
        data: {
            errMsg: err.message,
            generatedTime: new Date().toISOString(),
            msg: message
        }
    })
}
