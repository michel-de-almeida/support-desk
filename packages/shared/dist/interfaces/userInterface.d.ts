export interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    token?: string;
    isAdmin: boolean;
}
export interface IUserDetail extends Omit<IUser, 'password'> {
}
export interface IRegData extends Omit<IUser, 'id' | 'token' | 'isAdmin'> {
    repeatPassword: string;
}
export interface ILoginData extends Pick<IUser, 'email' | 'password'> {
}
