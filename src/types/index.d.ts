import { QueryOptions } from 'mongoose'
import { IUserDoc } from '../model/user.model'
export type TProjectionFields<T> = {
    [K in keyof T]?: 0 | 1
}

// USER
export interface IMongoUserInput {
    name: string
    email: string
    password: string
    avatar?: string
    isSocialSignUp?: boolean
    socialId?: string
    socialProvider?: string
}

export type IMongoUserFilter = {
    email?: string
    socialId?: string
    _id?: string
}

export type IMongoUserProjection = TProjectionFields<IUserDoc>

export type IMongoFindUserOptions = {
    filter: IMongoUserFilter
    projection?: IMongoUserProjection
    options?: QueryOptions<IUserDoc> & { lean: true }
}
