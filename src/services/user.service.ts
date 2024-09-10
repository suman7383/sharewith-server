import { IUserSerice } from '../interface/user.interface'
import User from '../model/user.model'
import { IMongoFindUserOptions, IMongoUserInput } from '../types'
import logger from '../utils/logger'

export class UserService implements IUserSerice {
    async createUser(data: IMongoUserInput) {
        try {
            const user = new User(data)
            return await user.save()
        } catch (err) {
            logger.error('Error creating user at user.servive', {
                meta: {
                    err
                }
            })

            throw err
        }
    }

    async findUser({ filter, projection, options }: IMongoFindUserOptions) {
        try {
            return await User.findOne(filter, projection, options)
        } catch (err) {
            logger.error('Error finding user at user.servive', {
                meta: {
                    err
                }
            })

            throw err
        }
    }
}

const userService = new UserService()

export default userService
