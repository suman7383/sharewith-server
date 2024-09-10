import express from 'express'
import { authController } from '../controller/auth.controller'

const router = express.Router()

router.route('/signup').post((req, res, next) => {
    //validate input

    authController.signUp(req, res, next).catch((err) => next(err))
})

export const authRouter = router
