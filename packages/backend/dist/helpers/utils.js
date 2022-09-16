"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseMessage = exports.vaildateJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var vaildateJWT = function (token) {
    // Verify token
    if (token) {
        try {
            var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            return false;
        }
    }
    return false;
};
exports.vaildateJWT = vaildateJWT;
var getResponseMessage = function (success, message, payload) {
    return {
        success: success,
        message: message,
        payload: payload,
    };
};
exports.getResponseMessage = getResponseMessage;
