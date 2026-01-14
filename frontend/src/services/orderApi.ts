// import axios from "axios";
// import type { Order
//  } from "../types/orders";
// const API_URL="http://localhost:3000/api/orders/customer/customerId";
// export const getOrders=async():Promise<Order[]>=>{
//     const response = await axios.get<Order[]>(API_URL);
//     console.log("API response",response);
//     return response.data.map((item) => ({
//     id: item.id,
//     orderNumber: item.orderNumber,
//     date: item.date,
//     items: item.items.map((item:any) => ({
//       name: item.product.name,
//       quantity: item.quantity,
//       price:item.price,
//     })),
//     status: item.status,
//   }));
// };
import axios from "axios";
import type { Order } from "../types/orders";

const API_URL = "http://localhost:3000/api/orders/my-orders"; 
export const getOrders = async (): Promise<Order[]> => {
    const token = localStorage.getItem("Accesstoken");
    console.log("Token from localStorage:", token);
  const response = await axios.get<Order[]>(API_URL
    ,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
console.log("API response", response.data);

  return response.data.map((item) => ({
    id: item.id,
    orderNumber: item.orderNumber,
    OrderDate: item.OrderDate,
    status: item.status,
    items: (item.items || []).map((i: any) => ({
      name: i.product?.name || "Unknown Product",
      quantity: i.quantity,
      price: i.price,
    })),
  }));
};

