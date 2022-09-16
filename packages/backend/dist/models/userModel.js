"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLogin = exports.UserModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var isValidLogin = function () { };
exports.isValidLogin = isValidLogin;
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "'name' is a required field"],
    },
    email: {
        type: String,
        required: [true, "'email' is a required field"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "'password' is a required field"],
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
}, {
    timestamps: true,
});
var UserModel = mongoose_1.default.model('User', userSchema);
exports.UserModel = UserModel;
