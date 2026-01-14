// import { Order } from "../models/Order.js";
// import { OrderItem } from "../models/OrderItem.js";

// export const seedOrders = async () => {
//   const orders = await Order.bulkCreate(
//     [
//       {
//         orderNumber: "ORD12345",
//         orderDate: new Date("2026-01-08"),
//         customerId: 101,
//         storeId: 1,
//         status: "Delivered",
//       },
//       {
//         orderNumber: "ORD12346",
//         orderDate: new Date("2026-01-07"),
//         customerId: 102,
//         storeId: 1,
//         status: "In Progress",
//       },
//       {
//         orderNumber: "ORD12347",
//         orderDate: new Date("2026-01-06"),
//         customerId: 103,
//         storeId: 2,
//         status: "Returned",
//       },
//     ],
//     { returning: true }
//   );

//   await OrderItem.bulkCreate([
//     {
//       orderId: orders[0].id,
//       productId: 1, // Laptop
//       quantity: 1,
//       price: 800,
//     },
//     {
//       orderId: orders[0].id,
//       productId: 2, // HeadPhones
//       quantity: 2,
//       price: 100,
//     },
//     {
//       orderId: orders[1].id,
//       productId: 3, // Shoes
//       quantity: 1,
//       price: 50,
//     },
//     {
//       orderId: orders[2].id,
//       productId: 4, // SmartWatch
//       quantity: 1,
//       price: 200,
//     },
//   ]);

//   console.log("Orders seeded successfully");
// };
import { Order } from "../models/Order.js";
import { OrderItem } from "../models/OrderItem.js";

export const seedOrders= async () => {
  const orders = await Order.findAll({
    where: { id: [1, 2, 3] }, // existing orders
  });

  await OrderItem.bulkCreate([
    {
      orderId: orders.find(o => o.id === 1)!.id,
      productId: 1,
      quantity: 1,
      price: 800,
    },
    {
      orderId: orders.find(o => o.id === 1)!.id,
      productId: 2,
      quantity: 2,
      price: 100,
    },
    {
      orderId: orders.find(o => o.id === 2)!.id,
      productId: 3,
      quantity: 1,
      price: 50,
    },
    {
      orderId: orders.find(o => o.id === 3)!.id,
      productId: 4,
      quantity: 1,
      price: 200,
    },
  ]);

  console.log("Order items seeded successfully");
};
