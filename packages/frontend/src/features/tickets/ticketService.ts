import axios, { AxiosRequestConfig } from 'axios'
import { ITicket } from 'support-desk-shared'

const API_URL = '/api/tickets/'

const getTickets = async (token: string | undefined) => {
    const config: AxiosRequestConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data as ITicket[]
}

export const ticketService = { getTickets }
