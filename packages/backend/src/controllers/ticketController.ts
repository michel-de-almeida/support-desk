import expressAsyncHandler from 'express-async-handler'
import { StatusCodes } from 'http-status-codes'
import { getResponseMessage } from '../helpers/helpers'
import { TicketModel } from '../models/ticketModel'
import { ITicket } from 'support-desk-shared'

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Gets all tickets. Admin only
// @route   GET /api/tickets/
// @access  Private
const getTickets = expressAsyncHandler(async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const tickets = await TicketModel.find()
            res.status(StatusCodes.OK).json(tickets)
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    } else {
        res.status(StatusCodes.UNAUTHORIZED)
        throw new Error('Action reserved for admin users only')
    }
})

// @desc    Gets all tickets. Admin only
// @route   GET /api/tickets/user
// @access  Private
const getUserTickets = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id

    if (userId) {
        try {
            const userTickets = await TicketModel.find({ userId: userId })
            res.status(StatusCodes.OK).json(userTickets)
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    } else {
        res.status(StatusCodes.BAD_REQUEST)
        throw new Error('Invalid user login. Please login and try again')
    }
})

// @desc    Get ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = expressAsyncHandler(async (req, res) => {
    const ticketId = req.params.id

    if (ticketId) {
        try {
            const ticket = await TicketModel.findById(ticketId)
            res.status(StatusCodes.OK).json(ticket)
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    }
})

// @desc    Create ticket
// @route   POST /api/tickets
// @access  Private
const setTicket = expressAsyncHandler(async (req, res) => {
    const ticket: ITicket = req.body

    if (ticket) {
        ticket.userId = req.user.id
        try {
            const newTicket = await TicketModel.create(ticket)
            res.status(StatusCodes.CREATED).json(
                getResponseMessage('Ticket created', { id: newTicket.id })
            )
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    }
})

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = expressAsyncHandler(async (req, res) => {
    const ticketId = req.params.id

    if (ticketId) {
        try {
            await TicketModel.findByIdAndDelete(ticketId)
            res.status(StatusCodes.OK).json(
                getResponseMessage('Ticket deleted')
            )
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error('Ticket does not exist')
        }
    }
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = expressAsyncHandler(async (req, res) => {
    const ticket: ITicket = req.body

    if (ticket) {
        try {
            await TicketModel.findByIdAndUpdate(ticket.id, ticket, {
                new: true,
                runValidators: true,
            })
            res.status(StatusCodes.CREATED).json(
                getResponseMessage('Ticket updated')
            )
        } catch (error: any) {
            res.status(StatusCodes.BAD_REQUEST)
            throw new Error(error)
        }
    }
})

export const TicketController = {
    getTickets,
    getUserTickets,
    getTicket,
    setTicket,
    deleteTicket,
    updateTicket,
}
