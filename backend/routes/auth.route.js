import express from "express";
import { authCheck, login, logout, signup, updatePassword, updateUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);
router.put("/update", protectRoute, updateUser);
router.put("/updatePassword", protectRoute, updatePassword);

export default router;

