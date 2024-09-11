/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import userService from '../services/user.service'
import { authError } from '../utils/errorHandling/errorResponse'
import { generateToken } from '../utils/token'
import { COOKIE_MAX_AGE } from '../constant/application'

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
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as {
        email: string
        password: string
    }

    const user = await userService.findUser({
        filter: {
            email
        }
    })

    if (!user)
        return next(
            authError(
                new Error('wrong email or password'),
                'wrong email or password'
            )
        )

    if (!(await user.comparePassword(password)))
        return next(
            authError(
                new Error('Wrong email or password'),
                'Wrong email or password'
            )
        )

    const accessToken = generateToken({
        _id: user._id
    })

    //Send the token
    res.status(200).json({
        success: true,
        data: {
            token: accessToken
        },
        message: 'Login Successful'
    })
}

export const authController = {
    signUp,
    login
}
