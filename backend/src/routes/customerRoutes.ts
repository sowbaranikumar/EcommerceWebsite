import {CustomerHome, getAllCustomers} from "../controllers/CustomerController.js";
import {authenticate,authorize} from "../middleware/authMiddleware.js";
import customerMiddleware from "../middleware/customerMiddleware.js";
import {Router} from 'express';

const router=Router();  
router.get(
    "/home",
    authenticate,
    authorize(["CUSTOMER"]),
    customerMiddleware,
    CustomerHome
);
router.get("/",getAllCustomers);
export default router;