import { Customer } from "../models/Customer.js";

export const seedCustomers = async () => {
  const customers = [
    {
      id: 101,
      name: "Rahul",
      email: "rahul@gmail.com",
      phone: "9876543210",
      status: "Active",
      storeId: 1,
    },
    {
      id: 102,
      name: "Anita",
      email: "anita@gmail.com",
      phone: "9123456780",
      status: "Inactive",
      storeId: 1,
    },
    {
      id: 103,
      name: "Kumar",
      email: "kumar@gmail.com",
      phone: "9988776655",
      status: "Active",
      storeId: 2,
    },
    {
      id: 104,
      name: "Kemy",
      email: "kemy@gmail.com",
      phone: "9988776655",
      status: "Active",
      storeId: 3,
    },
    {
      id: 105,
      name: "Henry",
      email: "henry@gmail.com",
      phone: "9988776655",
      status: "Active",
      storeId: 4,
    },
  ];

  await Customer.bulkCreate(customers, {
    ignoreDuplicates: true,
  });

  console.log("Customers seeded successfully");
};
