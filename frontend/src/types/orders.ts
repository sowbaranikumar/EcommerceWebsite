
export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export type OrderStatus = "Delivered" | "In Progress" | "Returned";

export interface Order {
    id: number;
    orderNumber: string;
    OrderDate: string;
    items: OrderItem[];
    status: OrderStatus;
}
