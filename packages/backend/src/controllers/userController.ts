import expressAsyncHandler from 'express-async-handler'
import { vaildateJWT } from '../helpers/utils'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import { UserModel } from '../models/userModel'
import { ILoginData, IRegData, IUser } from 'support-desk-shared'

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const regData: IRegData = req.body

    // Find if user already exists
    const userExists = await UserModel.findOne({ email: regData.email })

    if (userExists) {
        res.status(StatusCodes.BAD_REQUEST)
        throw new Error('Account already exists')
    }

    //verify passwords match
    if (regData.password !== regData.repeatPassword) {
        res.status(StatusCodes.BAD_REQUEST)
        throw new Error('Passwords do not match')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(regData.password, salt)

    // Create user
    const user: IUser = {
        id: '',
        username: regData.username,
        password: hashedPassword,
        email: regData.email,
        isAdmin: regData.isAdmin,
    }
    const newUser = await UserModel.create(user)

    if (regData) {
        const token = await updateToken(newUser.id)
        res.status(StatusCodes.CREATED).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            token: token,
            isAdmin: newUser.isAdmin,
        })
    } else {
        res.status(StatusCodes.BAD_REQUEST)
        throw new Error('Invalid user data')
    }
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = expressAsyncHandler(async (req, res) => {
    const cred: ILoginData = req.body

    const user = await UserModel.findOne({ email: cred.email })

    // Check user and passwords match
    if (user && (await bcrypt.compare(cred.password, user.password))) {
        user.token = await updateToken(user.id)

        res.status(StatusCodes.OK).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: user.token,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(StatusCodes.UNAUTHORIZED)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getLoggedUser = expressAsyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    res.status(StatusCodes.OK).json(user)
})

const updateToken = async (userId: string) => {
    if (userId) {
        try {
            //get user to check the token
            const user = await UserModel.findById(userId)

            if (user) {
                //Validate the token, if it exists
                const token = vaildateJWT(user.token)

                //If the token is invalid, gen a new token and write to db
                if (token == false) {
                    const newToken = generateToken(userId)
                    //write to database
                    const updatedUser = await UserModel.findByIdAndUpdate(
                        userId,
                        {
                            token: newToken,
                        }
                    )
                    if (updatedUser) {
                        return newToken
                    }
                } else return user.token
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

// Generate token
const generateToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '1d',
    })
}

export const UserController = { registerUser, loginUser, getLoggedUser }
