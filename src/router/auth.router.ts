import express, { RequestHandler } from 'express'
import { authController } from '../controller/auth.controller'
import { asyncReqHandler } from '../utils/asyncHandler'
import passport from 'passport'
import { generateToken } from '../utils/token'
import { COOKIE_MAX_AGE } from '../constant/application'
import config from '../config/config'

const router = express.Router()

router.route('/signup').post((req, res, next) => {
    //validate input

    next()
}, asyncReqHandler(authController.signUp))

router.post(
    '/login',
    (req, res, next) => {
        //validate input

        next()
    },
    asyncReqHandler(authController.login)
)

router.route('/google').get(
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }) as RequestHandler
)

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${config.FRONTEND_URL}/sign-in?success=false&message=Error Occured`,
        session: false,
        failureMessage: true
    }) as RequestHandler,
    (req, res) => {
        const user = req.user as { _id: string }

        const token = generateToken({
            _id: user._id
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: COOKIE_MAX_AGE,
            sameSite: 'lax'
        })

        res.redirect(`${config.FRONTEND_URL}/home`)
    }
)

export const authRouter = router
