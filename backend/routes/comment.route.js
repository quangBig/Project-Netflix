import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { addComment, deleteCommentbyUser, getAllComments, updateComment } from "../controllers/comment.controller.js";


const router = express.Router();

router.get('/:movieId', getAllComments); // Lấy tất cả bình luận
router.post('/', protectRoute, addComment); // Thêm bình luận (yêu cầu đăng nhập)
router.delete('/:id', protectRoute, deleteCommentbyUser); // Xóa bình luận (yêu cầu đăng nhập)
router.put('/:id', protectRoute, updateComment); // Cập nhật bình luận (yêu cầu đăng nhập)

export default router;