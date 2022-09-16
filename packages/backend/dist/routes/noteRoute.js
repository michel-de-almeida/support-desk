"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var noteController_1 = require("../controllers/noteController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.get('/ticket/:id', authMiddleware_1.protect, noteController_1.NoteController.getNotesByTicketId);
router.get('/:id', authMiddleware_1.protect, noteController_1.NoteController.getNote);
router.post('/', authMiddleware_1.protect, noteController_1.NoteController.setNote);
router.put('/', authMiddleware_1.protect, noteController_1.NoteController.updateNote);
router.delete('/:id', authMiddleware_1.protect, noteController_1.NoteController.deleteNote);
exports.default = router;
