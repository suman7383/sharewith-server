import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    COMPANY_NAME: process.env.COMPANY_NAME,
    COMPANY_EMAIL: process.env.COMPANY_EMAIL
}
