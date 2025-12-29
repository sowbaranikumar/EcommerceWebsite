import express from "express";
import sequelize from "./db.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();
app.use(express.json());

// sequelize
//   .authenticate()
//   .then(() => console.log("✅ Database connected"))
//   .catch((err) => console.error("❌ DB connection failed:", err));
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Models synced");
  } catch (error) {
    console.error("❌ DB error:", error);
  }
})();
app.use("/api/auth", authRoutes);
export default app;
