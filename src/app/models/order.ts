import { Address } from "./address";
import { OrderItem } from "./orderItem";

export interface Order {
    id: any;
    instant: string;
    deliveryAddress: Address;
    items: OrderItem[];
}