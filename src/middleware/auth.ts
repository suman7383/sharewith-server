import passport from 'passport'
import { IVerifyOptions, Strategy as LocalStrategy } from 'passport-local'
import userService from '../services/user.service'

const asyncHandler =
    (
        fn: (
            email: string,
            password: string,
            done: (
                error: unknown,
                user?: Express.User,
                options?: IVerifyOptions
            ) => void
        ) => unknown
    ) =>
    (
        email: string,
        password: string,
        done: (
            error: unknown,
            user?: Express.User,
            options?: IVerifyOptions
        ) => void
    ) => {
        Promise.resolve(fn(email, password, done)).catch((err) => done(err))
    }

//for login using email and password
passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        asyncHandler(async (email, password, done) => {
            const user = await userService.findUser({
                filter: {
                    email
                }
            })
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email or password'
                })
            }

            const isMatch = await user.comparePassword(password)
            if (isMatch) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect password.' })
            }
        })
    )
)
