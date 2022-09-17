"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../helpers/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const userModel_1 = require("../models/userModel");
const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const regData = req.body;
    const userExists = await userModel_1.UserModel.findOne({ email: regData.email });
    if (userExists) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error('Account already exists');
    }
    if (regData.password !== regData.repeatPassword) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error('Passwords do not match');
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(regData.password, salt);
    const user = {
        id: '',
        username: regData.username,
        password: hashedPassword,
        email: regData.email,
        isAdmin: regData.isAdmin,
    };
    const newUser = await userModel_1.UserModel.create(user);
    if (newUser) {
        const token = await updateToken(newUser.id);
        res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, undefined, {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            token: token,
            isAdmin: newUser.isAdmin,
        }));
    }
    else {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error('Invalid user data');
    }
});
const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const cred = req.body;
    const user = await userModel_1.UserModel.findOne({ email: cred.email });
    if (user && (await bcryptjs_1.default.compare(cred.password, user.password))) {
        const token = await updateToken(user.id);
        res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, {
            id: user.id,
            username: user.username,
            email: user.email,
            token: token,
            isAdmin: user.isAdmin,
        }));
    }
    else {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error('Invalid credentials');
    }
});
const getLoggedUser = (0, express_async_handler_1.default)(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    };
    res.status(http_status_codes_1.StatusCodes.OK).json(user);
});
const updateToken = async (userId) => {
    if (userId) {
        try {
            const user = await userModel_1.UserModel.findById(userId);
            if (user) {
                const token = (0, utils_1.vaildateJWT)(user.token);
                if (token == false) {
                    const newToken = generateToken(userId);
                    const updatedUser = await userModel_1.UserModel.findByIdAndUpdate(userId, {
                        token: newToken,
                    });
                    if (updatedUser) {
                        return newToken;
                    }
                    else
                        return null;
                }
                else
                    return user.token;
            }
            else
                throw new Error('User not found');
        }
        catch (error) {
            throw new Error(error);
        }
    }
    else
        return null;
};
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
exports.UserController = { registerUser, loginUser, getLoggedUser };
//# sourceMappingURL=userController.js.map