import { Request, Response } from 'express';
import { Customer } from "../models/Customer.js";
import { Store } from "../models/Store.js";
export const CustomerHome = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Home page",
    user: req.user,
  })

};
export const getAllCustomers = async (req:Request, res: Response) => {
  try {
    const customers = await Customer.findAll({
      include:[
        {
          model: Store,
          as:"store",
          attributes: ["id","name"],
        },
      ],
    });
    res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers", error);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};
