"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseMessage = exports.vaildateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const vaildateJWT = (token) => {
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            return false;
        }
    }
    return false;
};
exports.vaildateJWT = vaildateJWT;
const getResponseMessage = (success, message, payload) => {
    return {
        success: success,
        message: message,
        payload: payload,
    };
};
exports.getResponseMessage = getResponseMessage;
//# sourceMappingURL=utils.js.map