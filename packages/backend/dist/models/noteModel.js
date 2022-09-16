"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var noteSchema = new mongoose_1.default.Schema({
    ticketId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket',
    },
    noteText: {
        type: String,
        required: [true, 'Please add note text'],
    },
    createdBy_Id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    createdBy_Name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var NoteModel = mongoose_1.default.model('Note', noteSchema);
exports.NoteModel = NoteModel;
