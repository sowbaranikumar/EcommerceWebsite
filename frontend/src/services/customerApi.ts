import axios from "axios";
import type { Customer } from "../types/Customer";

const API_URL = "http://localhost:3000/api/customer";
export const getAllCustomers = async (): Promise<Customer[]> => {
  const res = await axios.get(API_URL);
  console.log("api response",res);
  return res.data.map((item:any)=>({
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    status: item.status,
    storeName: item.store?.name??"unknown Store",
  }));
};