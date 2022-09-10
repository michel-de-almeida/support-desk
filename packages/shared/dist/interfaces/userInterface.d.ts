export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}
export declare const initUser: () => IUser;
