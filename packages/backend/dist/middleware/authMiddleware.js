"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const utils_1 = require("../helpers/utils");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = require("../models/userModel");
const http_status_codes_1 = require("http-status-codes");
const protect = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = (0, utils_1.vaildateJWT)(token);
            if (decoded) {
                req.user = await userModel_1.UserModel.findById(decoded.userId).select('-password');
            }
            if (!req.user) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
                throw new Error('User not found');
            }
            next();
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            throw new Error('Not authorized');
        }
    }
    if (!token) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        throw new Error('Not authorized');
    }
});
exports.protect = protect;
//# sourceMappingURL=authMiddleware.js.map