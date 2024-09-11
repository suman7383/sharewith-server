import {
    Strategy as GoogleStrategy,
    StrategyOptions,
    VerifyCallback
} from 'passport-google-oauth20'
import { Profile } from 'passport'
import config from '../config/config'
import userService from '../services/user.service'
import logger from '../utils/logger'

const options: StrategyOptions = {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
}

const asyncHandler =
    (
        fn: (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => Promise<void>
    ) =>
    (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ) => {
        Promise.resolve(fn(accessToken, refreshToken, profile, done)).catch(
            (error: unknown) => {
                logger.error('Error in google oauth2 async handler:', {
                    meta: {
                        err: error
                    }
                })
                done(error)
            }
        )
    }

export const googlePassportStrategy = new GoogleStrategy(
    options,
    asyncHandler(async (accessToken, refreshToken, profile, done) => {
        try {
            logger.info('User profile', {
                meta: {
                    data: profile
                }
            })
            const user = await userService.findUser({
                filter: { socialId: profile.id }
            })

            if (user) {
                done(null, user)
                return
            }

            // If no user is found, create a new user
            const newUser = await userService.createUser({
                name: profile.displayName,
                email: profile.emails![0].value,
                socialId: profile.id,
                isSocialSignUp: true,
                socialProvider: 'google'
            })

            done(null, newUser)
        } catch (err) {
            done(err)
        }
    })
)
