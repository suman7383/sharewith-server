import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'
import { authError } from '../utils/errorHandling/errorResponse'
import { IMongoUserInput } from '../types'

export interface IUserDoc extends IMongoUserInput, Document {
    comparePassword: (password: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<IUserDoc>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: function () {
                // Password is required only if the user is not using social sign-up
                return !this.isSocialSignUp
            }
        },
        avatar: {
            type: String,
            default: null
        },
        isSocialSignUp: {
            type: String,
            default: false
        },
        socialProvider: {
            type: String,
            enum: ['google', null], //add more as needed
            default: null
        },
        socialId: {
            type: String,
            unique: true,
            sparse: true // Allows unique to work with null values
        }
    },
    {
        timestamps: true
    }
)

userSchema.methods.comparePassword = async function (password: string) {
    if (this.isSocialSignUp && !this.password) {
        throw authError(
            new Error('Used Social signup. Please use forgot password option'),
            'Used Social signup. Please use forgot password option'
        )
    }
    if (typeof this.password === 'string' && this.password.length > 0)
        return await bcrypt.compare(password, this.password).catch(() => false)
    return false
}

export default mongoose.model<IUserDoc>('User', userSchema)
