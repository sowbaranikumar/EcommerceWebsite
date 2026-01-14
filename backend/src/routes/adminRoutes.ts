import {Router} from "express";
import {adminDashboard} from "../controllers/AdminController.js";
import {authenticate,authorize} from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router=Router();
router.get(
  "/dashboard",
  authenticate,
  authorize(["ADMIN"]),
  adminMiddleware,
  adminDashboard
);
export default router;
