import Comment from "../models/comment.model.js"; // Đường dẫn tới file model
// import User from "../models/user.model.js"; // Đường dẫn tới model User nếu cần

// Lấy tất cả bình luận theo movieId
export const getAllComments = async (req, res) => {
    const { movieId } = req.params;

    try {
        const comments = await Comment.find({ movieId }).populate('user', 'email');
        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Failed to fetch comments" });
    }
};

// Thêm bình luận mới
export const addComment = async (req, res) => {
    const { content, movieId } = req.body;
    const userId = req.user.id; // user được gắn qua middleware protectRoute

    if (!content || !content.trim()) {
        return res.status(400).json({ success: false, message: "Content is required" });
    }

    try {
        const newComment = await Comment.create({
            user: userId,
            movieId,
            content,
        });

        const populatedComment = await newComment.populate('user', 'email'); // Lấy thông tin email của user

        res.status(201).json({ success: true, comment: populatedComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Failed to add comment" });
    }
};

// Xóa bình luận
export const deleteCommentbyUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // user được gắn qua middleware protectRoute

    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this comment" });
        }

        await comment.deleteOne();

        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ success: false, message: "Failed to delete comment" });
    }
};
export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        comment.content = content;

        await comment.save();

        res.status(200).json({ success: true, comment });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ success: false, message: "Failed to update comment" });
    }
}
