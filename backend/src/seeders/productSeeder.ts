import { Product } from "../models/Product.js";

export const seedProducts = async () => {
  await Product.bulkCreate(
    [
      { name: "Laptop", price: 800, category: "Electronics" },
      { name: "Headphones", price: 100, category: "Electronics" },
      { name: "Smartphone", price: 600, category: "Electronics" },
      { name: "Camera", price: 500, category: "Electronics" },
      { name: "Smartwatch", price: 200, category: "Electronics" },
      { name: "Speaker", price: 150, category: "Electronics" },

     
      { name: "T-Shirt", price: 20, category: "Clothes" },
      { name: "Jeans", price: 40, category: "Clothes" },
      { name: "Jacket", price: 60, category: "Clothes" },
      { name: "Shoes", price: 50, category: "Clothes" },
      { name: "Hat", price: 15, category: "Clothes" },
      { name: "Socks", price: 10, category: "Clothes" },

      { name: "Mixer", price: 70, category: "Kitchen" },
      { name: "Toaster", price: 30, category: "Kitchen" },
      { name: "Knife Set", price: 40, category: "Kitchen" },
      { name: "Pan", price: 25, category: "Kitchen" },
      { name: "Coffee Maker", price: 80, category: "Kitchen" },
      { name: "Blender", price: 50, category: "Kitchen" },
    ],
    { ignoreDuplicates: true }
  );

  console.log("Products seeded successfully");
};
