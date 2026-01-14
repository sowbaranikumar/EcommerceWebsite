import {Router } from "express";
import {register,login} from "../controllers/auth.controller.js";
import {Logout} from "../controllers/LogoutController.js";
const router=Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",Logout);
export default router;

