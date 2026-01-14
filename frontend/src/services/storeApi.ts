import axios from "axios";

const API_URL = "http://localhost:3000/api/stores";

export const getAllStores = async () => {
  return await axios.get(`${API_URL}`);
};

export const createStore = async (storeData: {
  name: string;
  category: string;
  status: "In Stock" | "Out of Stock";
}) => {
  return await axios.post(`${API_URL}`, storeData);
};

export const deleteStore = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const getStoreCustomers=async (storeId: number) => {
  return await axios.get(`${API_URL}/${storeId}/customers`);
};
