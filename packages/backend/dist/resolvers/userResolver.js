"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_IO_1 = require("./types/user-IO");
const userEntity_1 = require("../entities/userEntity");
const argon2_1 = __importDefault(require("argon2"));
let UserResolver = class UserResolver {
    async register(options) {
        const userExists = await userEntity_1.UserModel.findOne({ email: options.email });
        if (userExists) {
            return { errors: [{ field: 'email', message: 'Account already exists' }] };
        }
        if (!options.password) {
            return { errors: [{ field: 'password', message: 'Password cannot be empty' }] };
        }
        const hashedPassword = await argon2_1.default.hash(options.password);
        const user = {
            email: options.email,
            password: hashedPassword,
            username: options.username,
            role: options.role && options.role,
        };
        const newUser = await userEntity_1.UserModel.create(user);
        if (!newUser) {
            return {
                errors: [
                    { message: 'An error occoured while creating your account. Please try again' },
                ],
            };
        }
        return { user: newUser };
    }
    async login(options) {
        const user = await userEntity_1.UserModel.findOne({ email: options.email });
        if (!user) {
            return {
                errors: [
                    {
                        field: 'email',
                        message: 'Account with this email does not exist. Please create and account',
                    },
                ],
            };
        }
        const isPasswordValid = await argon2_1.default.verify(user.password, options.password);
        if (!isPasswordValid) {
            return { errors: [{ field: 'password', message: 'Invalid password' }] };
        }
        return { user: user };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_IO_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_IO_1.UserRegInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_IO_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_IO_1.UserLoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=userResolver.js.map