import { Request, Response } from "express";
import { Store } from "../models/Store.js";
import { Customer } from "../models/Customer.js";

export const getAllStores = async (req: Request, res: Response) => {
    try {
        const stores = await Store.findAll();
        return res.status(200).json(stores);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch stores",
            error,
        });
    }
};
export const getStoreById = async (req: Request, res: Response) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId);
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }
        return res.status(200).json(store);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch store",
            error,
        });
    }
};
export const getStoreWithCustomers = async (req: Request, res: Response) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId, {
            include: [
                {
                    model: Customer,
                    as: "customers",
                },
            ],
        });
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        return res.status(200).json(store);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch store with customers",
            error,
        });
    }
};
export const createStore = async (req: Request, res: Response) => {
    try {
        const { name, category, status } = req.body;
        const store = await Store.create({ name, category, status });
      
        res.status(201).json(store);
    } catch (err) {
        res.status(500).json({ message: "Failed to create store", error: err });
    }
};


export const deleteStore = async (req: Request, res: Response) => {
    try {
       
        const {storeId}=req.params;
        const store = await Store.findByPk(storeId);
        console.log("id",storeId);
        if (!store) return res.status(404).json({ message: "Store not found" });

        await store.destroy();
        res.json({ message: "Store deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete store", error: err });
    }
};
