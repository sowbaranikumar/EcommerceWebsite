import { Request, Response } from "express";
import { Product } from "../models/Product.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
    // res.json({message:"Products API Working"});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();

    const grouped = products.reduce((acc: any, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: "Failed to group products" });
  }
};
