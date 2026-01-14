import { Router } from "express";
import { authenticate,authorize} from "../middleware/authMiddleware.js";

const router=Router();
router.get(
  "/admin",
  authenticate,
  authorize(["ADMIN"]),
  (req, res) => {
    res.json({ message:"Welcome Admin",user:req.user});
  }
);
router.get(
  "/customer",
  authenticate,
  authorize(["CUSTOMER"]),
  (req,res)=>
  {
    res.json({message:"Welcome Customer",user: req.user });
  }
);
export default router;
