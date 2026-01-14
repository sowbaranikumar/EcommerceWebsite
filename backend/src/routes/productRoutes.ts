import { Router } from "express";
import {
  getAllProducts,
  getProductsByCategory,
} from "../controllers/productController.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/grouped", getProductsByCategory);
export default router;
