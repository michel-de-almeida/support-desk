import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
    {
        ticketId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Ticket',
        },
        noteText: {
            type: String,
            required: [true, 'Please add note text'],
        },
        createdBy_Id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        createdBy_Name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const NoteModel = mongoose.model('Note', noteSchema)

export { NoteModel }
