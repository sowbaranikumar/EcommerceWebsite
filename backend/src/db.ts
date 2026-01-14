import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "./models/User.js";
import { Store } from "./models/Store.js";
import { Product} from "./models/Product.js";
import {Customer} from "./models/Customer.js";
import {OrderItem} from "./models/OrderItem.js";
import {Order} from "./models/Order.js";
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: "mysql",
  models: [User,Store,Product,OrderItem,Customer,Order],
  logging: false,
});

//Store to customers
   Store.hasMany(Customer,{
    foreignKey:"storeId",
    as:'customers'
   });
    Customer.belongsTo(Store,{
    foreignKey:"storeId",
    as:'store'
   });
//store to order
   Store.hasMany(Order, {
  foreignKey: "storeId",
  as: "orders",
});

Order.belongsTo(Store, {
  foreignKey: "storeId",
  as: "store",
});
 // customer-orders
 Customer.hasMany(Order, {
  foreignKey: "customerId",
  as: "orders",
});

Order.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});
//order-orderItems
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

//product-orderitems
Product.hasMany(OrderItem, {
  foreignKey: "productId",
  as: "order_items",
});

OrderItem.belongsTo(Product,{
  foreignKey: "productId",
  as: "product",
});
//user-customer
User.hasOne(Customer, {
  foreignKey: "userId",
  as: "customer",
});

Customer.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});



export default sequelize;
