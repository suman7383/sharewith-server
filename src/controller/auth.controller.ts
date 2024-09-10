import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'

const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body as {
        email: string
        password: string
        name: string
    }

    const user = await userService.createUser({ email, password, name })

    res.status(201).json({
        success: true,
        data: user
    })

    next()
}

export const authController = {
    signUp
}
