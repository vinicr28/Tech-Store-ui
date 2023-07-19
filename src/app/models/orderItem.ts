import { ProductOffering } from "./productOffering";

export interface OrderItem {
    id: {productOffering: ProductOffering};
    quantity: number;
    discount: number;
    totalPrice: number;
}