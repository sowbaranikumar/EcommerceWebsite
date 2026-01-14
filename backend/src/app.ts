import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sequelize from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import adminRoutes from "./routes/adminRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import cookieParser from "cookie-parser";
import { seedStores } from "./seeders/store.seed.js";
import { seedCustomers } from "./seeders/customer.seed.js";
import {seedOrders} from "./seeders/order.seed.js";
import storeRoutes from "./routes/store.routes.js";
import productRoutes from "./routes/productRoutes.js"
import cors from "cors";
import { seedProducts } from "./seeders/productSeeder.js";
import orderRoutes from "./routes/orderRoutes.js";
const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());
(async()=>{
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ alter:true}); 
    console.log("Models synced in Database");
    // await seedStores();
    // await seedCustomers();
    // await seedProducts();
    // await seedOrders();
  } catch (error) {
    console.error("DB error:",error);
  }
})();

app.use("/api/auth",authRoutes);
app.use("/api/protected",protectedRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);

export default app;
