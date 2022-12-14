import axios from 'axios'
import { ITicket, API_URLS, IResponseData } from 'support-desk-shared'
import { extractErrorMessage } from '../../helpers/utils'

//Auth header is attached in the AxiosMiddleware component

const getUserTickets = async (token: string | undefined): Promise<IResponseData> => {
    try {
        const response = await axios.get(`${API_URLS.Tickets}/user`)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const getTickets = async (): Promise<IResponseData> => {
    try {
        const response = await axios.get(API_URLS.Tickets)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const getTicket = async (ticketId: string): Promise<IResponseData> => {
    try {
        const response = await axios.get(`${API_URLS.Tickets}/${ticketId}`)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const setTicket = async (ticket: ITicket): Promise<IResponseData> => {
    try {
        const response = await axios.post(API_URLS.Tickets, ticket)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const updateTicket = async (ticket: ITicket): Promise<IResponseData> => {
    try {
        const response = await axios.put(API_URLS.Tickets, ticket)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const deleteTicket = async (ticketId: string): Promise<IResponseData> => {
    try {
        const response = await axios.delete(`${API_URLS.Tickets}/${ticketId}`)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

export const TicketService = {
    getUserTickets,
    getTickets,
    getTicket,
    setTicket,
    updateTicket,
    deleteTicket,
}
