export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    token?: string;
    isAdmin: boolean;
}
export interface IUserDetail {
    id: string;
    username: string;
    email: string;
    token?: string;
    isAdmin: boolean;
}
export interface IRegData {
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    isAdmin: boolean;
}
export interface ILoginData {
    email: string;
    password: string;
}
