import {Router} from "express";
import {getOrders} from "../controllers/orderController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router= Router();
// router.get( "/customer/:customerId",getOrders);
router.get("/my-orders", authenticate,getOrders);
export default router;  