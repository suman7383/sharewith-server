import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

const config = {
    ENV: process.env.NODE_ENV!,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET!,
    MONGODB_URI: process.env.MONGODB_URI!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL!,
    FRONTEND_URL: process.env.FRONTEND_URL!
}

// Check if all required variables are defined
;(function () {
    Object.entries(config).forEach(([key, value]) => {
        if (!value) {
            throw new Error(`Missing environment variable: ${key}`)
        }
    })
})()

export default config
