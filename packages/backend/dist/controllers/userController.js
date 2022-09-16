"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var utils_1 = require("../helpers/utils");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var http_status_codes_1 = require("http-status-codes");
var userModel_1 = require("../models/userModel");
// @desc    Register a new user
// @route   /api/users
// @access  Public
var registerUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var regData, userExists, salt, hashedPassword, user, newUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                regData = req.body;
                return [4 /*yield*/, userModel_1.UserModel.findOne({ email: regData.email })];
            case 1:
                userExists = _a.sent();
                if (userExists) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                    throw new Error('Account already exists');
                }
                //verify passwords match
                if (regData.password !== regData.repeatPassword) {
                    res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                    throw new Error('Passwords do not match');
                }
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 2:
                salt = _a.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(regData.password, salt)
                    // Create user
                ];
            case 3:
                hashedPassword = _a.sent();
                user = {
                    id: '',
                    username: regData.username,
                    password: hashedPassword,
                    email: regData.email,
                    isAdmin: regData.isAdmin,
                };
                return [4 /*yield*/, userModel_1.UserModel.create(user)];
            case 4:
                newUser = _a.sent();
                if (!newUser) return [3 /*break*/, 6];
                return [4 /*yield*/, updateToken(newUser.id)];
            case 5:
                token = _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, undefined, {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    token: token,
                    isAdmin: newUser.isAdmin,
                }));
                return [3 /*break*/, 7];
            case 6:
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
                throw new Error('Invalid user data');
            case 7: return [2 /*return*/];
        }
    });
}); });
// @desc    Login a user
// @route   /api/users/login
// @access  Public
var loginUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cred, user, _a, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                cred = req.body;
                return [4 /*yield*/, userModel_1.UserModel.findOne({ email: cred.email })
                    // Check user and passwords match
                ];
            case 1:
                user = _b.sent();
                _a = user;
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, bcryptjs_1.default.compare(cred.password, user.password)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                if (!_a) return [3 /*break*/, 5];
                return [4 /*yield*/, updateToken(user.id)];
            case 4:
                token = _b.sent();
                res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    token: token,
                    isAdmin: user.isAdmin,
                }));
                return [3 /*break*/, 6];
            case 5:
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED);
                throw new Error('Invalid credentials');
            case 6: return [2 /*return*/];
        }
    });
}); });
// @desc    Get current user
// @route   /api/users/me
// @access  Private
var getLoggedUser = (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        user = {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
        };
        res.status(http_status_codes_1.StatusCodes.OK).json(user);
        return [2 /*return*/];
    });
}); });
var updateToken = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, token, newToken, updatedUser, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!userId) return [3 /*break*/, 7];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, userModel_1.UserModel.findById(userId)];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 5];
                token = (0, utils_1.vaildateJWT)(user.token);
                if (!(token == false)) return [3 /*break*/, 4];
                newToken = generateToken(userId);
                return [4 /*yield*/, userModel_1.UserModel.findByIdAndUpdate(userId, {
                        token: newToken,
                    })];
            case 3:
                updatedUser = _a.sent();
                if (updatedUser) {
                    return [2 /*return*/, newToken];
                }
                return [3 /*break*/, 5];
            case 4: return [2 /*return*/, user.token];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 7: return [2 /*return*/];
        }
    });
}); };
// Generate token
var generateToken = function (userId) {
    return jsonwebtoken_1.default.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};
exports.UserController = { registerUser: registerUser, loginUser: loginUser, getLoggedUser: getLoggedUser };
