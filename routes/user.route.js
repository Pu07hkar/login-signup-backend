import {Router} from "express";
import { registerUser, loginUser , product} from "../controllers/user.controller.js";
import ensureAuth from "../middlewares/autheUser.js";
const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/product").get(ensureAuth,product)
export default router;