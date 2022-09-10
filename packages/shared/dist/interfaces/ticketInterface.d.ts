export interface ITicket {
    id: string;
    userId: string;
    product: string;
    description: string;
    status?: string;
}
export declare const initTicket: () => ITicket;
