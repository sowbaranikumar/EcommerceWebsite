
import { Request, Response } from "express";
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";
import { Product } from "../models/Product.js";
import { Customer } from "../models/Customer.js";

export const getOrders = async (req: Request, res: Response) => {
  try {
     if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("User from token:", req.user);
    const customer = await Customer.findOne({
      where: { userId: req.user?.id },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const orders = await Order.findAll({
      where: { customerId: customer.id },
      include: [
        {
          model: OrderItem,
          as: "items",
          attributes: ["id", "quantity", "price"],
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching my orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
