"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controllers/userController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.post('/', userController_1.UserController.registerUser);
router.post('/login', userController_1.UserController.loginUser);
router.get('/me', authMiddleware_1.protect, userController_1.UserController.getLoggedUser);
exports.default = router;
