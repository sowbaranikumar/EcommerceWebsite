
import { Store } from "../models/Store.js";

export const seedStores = async () => {
  try {
    // const existingStores = await Store.count();
    // if (existingStores > 0) {
    //   console.log("Store data already exists. Skipping seeding.");
    //   return;
    // }

    await Store.bulkCreate([
      {
        name: "TechHub Electronics",
        category: "Electronics",
        status: "In Stock",
      },
      {
        name: "Urban Fashion",
        category: "Clothing",
        status: "In Stock",
      },
      {
        name: "Daily Needs Mart",
        category: "Groceries",
        status: "In Stock",
      },
      {
        name: "Glow Cosmetics",
        category: "Cosmetics",
        status: "Out of Stock",
      },
      {
        name: "HomeStyle Decor",
        category: "Home Decor",
        status: "In Stock",
      },
    ]);

    console.log("Store data seeded successfully");
  } catch (error) {
    console.error("Error seeding store data:", error);
  }
};
