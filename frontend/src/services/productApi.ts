import axios from "axios";
import type { Product } from "../types/products";

const API_URL = "http://localhost:3000/api/products";

export const getAllProducts=async():Promise<Product[]>=>{
    const res= await axios.get(API_URL);
    console.log(res);
    return res.data.map((item:any)=>(
        {
            Id:item.id(),
            Name:item.name(),
            Price:item.price(),
            Category:item.category()
        }
    ));
}
export const getProductsGrouped=async()=>{
  return await axios.get(`${API_URL}/grouped`);
};
