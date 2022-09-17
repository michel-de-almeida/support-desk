"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidLogin = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isValidLogin = () => { };
exports.isValidLogin = isValidLogin;
const userSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.UserModel = UserModel;
//# sourceMappingURL=userModel.js.map