import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";

import { removeFavorite, getFavorites, addFavorite, isFavorite } from "../controllers/favorite.controller.js";
const router = express.Router();


router.post("/", protectRoute, addFavorite); // Thêm mục yêu thích
router.get("/", protectRoute, getFavorites); // Lấy danh sách yêu thích
router.delete("/:itemId", protectRoute, removeFavorite); // Xóa mục yêu thích
router.get("/:itemId", protectRoute, isFavorite); // Kiểm tra mục yêu thích
export default router;