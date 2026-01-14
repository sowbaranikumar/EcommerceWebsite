import { Router } from "express";
import {
    createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  getStoreWithCustomers,
} from "../controllers/storeController.js";

const router = Router();
router.post("/", createStore);
router.get("/", getAllStores);
router.get("/:storeId", getStoreById);
router.get("/:storeId/customers", getStoreWithCustomers);
router.delete("/:storeId",deleteStore);
export default router;  
