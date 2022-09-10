export interface IUser {
    id: string
    username: string
    email: string
    password: string
    isAdmin?: boolean
}

export const initUser = (): IUser => {
    return {
        id: '',
        username: '',
        email: '',
        password: '',
        isAdmin: false,
    }
}
