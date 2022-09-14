import axios, { AxiosRequestConfig } from 'axios'
import { ITicket, API_URLS } from 'support-desk-shared'

const getTickets = async (token: string | undefined) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URLS.Tickets, config)

    return response.data as ITicket[]
}

export const ticketService = { getTickets }
