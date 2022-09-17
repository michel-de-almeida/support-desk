"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const utils_1 = require("../helpers/utils");
const noteModel_1 = require("../models/noteModel");
const getNotesByTicketId = (0, express_async_handler_1.default)(async (req, res) => {
    const ticketId = req.params.id;
    try {
        const notes = await noteModel_1.NoteModel.find({ ticketId: ticketId });
        res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, notes));
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
        throw new Error(error);
    }
});
const getNote = (0, express_async_handler_1.default)(async (req, res) => {
    const noteId = req.params.id;
    if (noteId) {
        try {
            const note = await noteModel_1.NoteModel.findById(noteId);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, undefined, note));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
});
const setNote = (0, express_async_handler_1.default)(async (req, res) => {
    const reqbody = req.body;
    if (reqbody) {
        const note = {
            ticketId: reqbody.ticketId,
            noteText: reqbody.noteText,
            createdBy_Id: req.user.id,
            createdBy_Name: req.user.username,
        };
        try {
            const newNote = await noteModel_1.NoteModel.create(note);
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, 'Note created', {
                noteId: newNote.id,
            }));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
});
const updateNote = (0, express_async_handler_1.default)(async (req, res) => {
    const reqbody = req.body;
    if (reqbody) {
        const note = {
            ticketId: reqbody.ticketId,
            noteText: reqbody.noteText,
            createdBy_Id: req.user.id,
            createdBy_Name: req.user.username,
        };
        try {
            await noteModel_1.NoteModel.findByIdAndUpdate(reqbody._id, note, {
                new: true,
                runValidators: true,
            });
            res.status(http_status_codes_1.StatusCodes.CREATED).json((0, utils_1.getResponseMessage)(true, 'Note updated'));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error(error);
        }
    }
});
const deleteNote = (0, express_async_handler_1.default)(async (req, res) => {
    const noteId = req.params.id;
    if (noteId) {
        try {
            await noteModel_1.NoteModel.findByIdAndDelete(noteId);
            res.status(http_status_codes_1.StatusCodes.OK).json((0, utils_1.getResponseMessage)(true, 'Note deleted'));
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
            throw new Error('Note does not exist');
        }
    }
});
exports.NoteController = { getNotesByTicketId, getNote, setNote, updateNote, deleteNote };
//# sourceMappingURL=noteController.js.map