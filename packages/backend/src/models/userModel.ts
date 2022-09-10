import mongoose from 'mongoose'

const isValidLogin = () => {}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, `'name' is a required field`],
        },
        email: {
            type: String,
            required: [true, `'email' is a required field`],
            unique: true,
        },
        password: {
            type: String,
            required: [true, `'password' is a required field`],
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        token: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.model('User', userSchema)

export { UserModel, isValidLogin }
