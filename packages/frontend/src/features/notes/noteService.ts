import axios from 'axios'
import { INote, INoteUpsert, API_URLS, IResponseData } from 'support-desk-shared'
import { extractErrorMessage } from '../../helpers/utils'

//Auth header is attached in the AxiosMiddleware component

const getNotesByTicketId = async (ticketId: string): Promise<IResponseData> => {
    try {
        const response = await axios.get(`${API_URLS.Notes}/ticket/${ticketId}`)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const getNote = async (noteId: string): Promise<IResponseData> => {
    try {
        const response = await axios.get(`${API_URLS.Notes}/${noteId}`)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const setNote = async (note: INoteUpsert): Promise<IResponseData> => {
    try {
        const response = await axios.post(API_URLS.Notes, note)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const updateNote = async (note: INoteUpsert): Promise<IResponseData> => {
    try {
        const response = await axios.put(API_URLS.Notes, note)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

const deleteNote = async (noteId: string): Promise<IResponseData> => {
    try {
        const response = await axios.delete(`${API_URLS.Notes}/${noteId}`)
        return response.data
    } catch (error) {
        return {
            success: false,
            message: extractErrorMessage(error),
        }
    }
}

export const NoteService = {
    getNotesByTicketId,
    getNote,
    setNote,
    updateNote,
    deleteNote,
}
