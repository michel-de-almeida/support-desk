import axios, { AxiosRequestConfig } from 'axios'
import { ITicket, API_URLS, IResponseMessage } from 'support-desk-shared'

const getUserTickets = async (token: string | undefined) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`${API_URLS.Tickets}/user`, config)

    return response.data as ITicket[]
}

const getTickets = async (token: string | undefined) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URLS.Tickets, config)

    return response.data as ITicket[]
}

const getTicket = async (token: string | undefined, ticketId: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(`${API_URLS.Tickets}/${ticketId}`, config)

    return response.data as ITicket
}

const setTicket = async (token: string | undefined, ticket: ITicket) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URLS.Tickets, ticket, config)

    return response.data as IResponseMessage
}

const updateTicket = async (token: string | undefined, ticket: ITicket) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.put(API_URLS.Tickets, ticket, config)

    return response.data as IResponseMessage
}

const deleteTicket = async (token: string | undefined, ticketId: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(
        `${API_URLS.Tickets}/${ticketId}`,
        config
    )

    return response.data as IResponseMessage
}

export const TicketService = {
    getUserTickets,
    getTickets,
    getTicket,
    setTicket,
    updateTicket,
    deleteTicket,
}
