import { OrderItemDTO } from "./orderItemDTO";

export interface OrderDTO{
    customerId: any;
    addressId: any;
    orderItem: OrderItemDTO[];
    discount: number;
}
