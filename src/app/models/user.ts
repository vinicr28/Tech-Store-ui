import { Customer } from "./customer";

export interface User {
    id: number;
    email: string;
    password: string;
    customer: Customer;
}