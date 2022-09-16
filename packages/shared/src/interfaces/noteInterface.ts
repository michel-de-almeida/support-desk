export interface INote {
    _id?: string
    ticketId: string
    noteText: string
    createdBy_Id: string
    createdBy_Name: string
    createdAt?: string
}

export interface INoteUpsert extends Pick<INote, '_id' | 'ticketId' | 'noteText'> {}
