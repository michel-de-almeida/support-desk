import axios, { AxiosRequestConfig } from 'axios'
import { ITicket, API_URLS, IResponseData } from 'support-desk-shared'
import { extractErrorMessage } from '../../helpers/utils'

const getUserTickets = async (token: string | undefined): Promise<IResponseData> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await axios.get(`${API_URLS.Tickets}/user`, config)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const getTickets = async (token: string | undefined): Promise<IResponseData> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await axios.get(API_URLS.Tickets, config)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const getTicket = async (token: string | undefined, ticketId: string): Promise<IResponseData> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await axios.get(`${API_URLS.Tickets}/${ticketId}`, config)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const setTicket = async (token: string | undefined, ticket: ITicket): Promise<IResponseData> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await axios.post(API_URLS.Tickets, ticket, config)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const updateTicket = async (token: string | undefined, ticket: ITicket): Promise<IResponseData> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await axios.put(API_URLS.Tickets, ticket, config)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const deleteTicket = async (
    token: string | undefined,
    ticketId: string
): Promise<IResponseData> => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await axios.delete(`${API_URLS.Tickets}/${ticketId}`, config)
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
