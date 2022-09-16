import expressAsyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import { getResponseMessage } from '../helpers/utils'
import { NoteModel } from '../models/noteModel'
import { INote, INoteUpsert } from 'support-desk-shared'

// @desc    Gets all notes for a ticketId. Returns INote[]
// @route   GET /api/notes/ticket/:id
// @access  Private
const getNotesByTicketId = expressAsyncHandler(async (req, res) => {
    const ticketId = req.params.id
    try {
        const notes = await NoteModel.find({ ticketId: ticketId })
        res.status(StatusCodes.OK).json(getResponseMessage(true, undefined, notes))
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST)
        throw new Error(error)
    }
})

// @desc    Get note. Returns INote
// @route   GET /api/note/:id
// @access  Private
const getNote = expressAsyncHandler(async (req, res) => {
    const noteId = req.params.id

    if (noteId) {
        try {
            const note = await NoteModel.findById(noteId)
            res.status(StatusCodes.OK).json(getResponseMessage(true, undefined, note))
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    }
})

// @desc    Create note
// @route   POST /api/notes
// @access  Private
const setNote = expressAsyncHandler(async (req, res) => {
    const reqbody: INoteUpsert = req.body

    if (reqbody) {
        const note: INote = {
            ticketId: reqbody.ticketId,
            noteText: reqbody.noteText,
            createdBy_Id: req.user.id,
            createdBy_Name: req.user.username,
        }

        try {
            const newNote = await NoteModel.create(note)
            res.status(StatusCodes.CREATED).json(
                getResponseMessage(true, 'Note created', {
                    noteId: newNote.id,
                })
            )
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    }
})

// @desc    Update Note
// @route   PUT /api/notes/
// @access  Private
const updateNote = expressAsyncHandler(async (req, res) => {
    const reqbody: INoteUpsert = req.body

    if (reqbody) {
        const note: INote = {
            ticketId: reqbody.ticketId,
            noteText: reqbody.noteText,
            createdBy_Id: req.user.id,
            createdBy_Name: req.user.username,
        }
        try {
            await NoteModel.findByIdAndUpdate(reqbody._id, note, {
                new: true,
                runValidators: true,
            })
            res.status(StatusCodes.CREATED).json(getResponseMessage(true, 'Note updated'))
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    }
})

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = expressAsyncHandler(async (req, res) => {
    const noteId = req.params.id

    if (noteId) {
        try {
            await NoteModel.findByIdAndDelete(noteId)
            res.status(StatusCodes.OK).json(getResponseMessage(true, 'Note deleted'))
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error('Note does not exist')
        }
    }
})

export const NoteController = { getNotesByTicketId, getNote, setNote, updateNote, deleteNote }
