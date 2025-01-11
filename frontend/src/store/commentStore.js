import { create } from "zustand";

export const useCommentStore = create((set, get) => ({
  commentsByMovie: {}, // Bình luận được lưu theo từng movieId

  // Lấy tất cả bình luận theo movieId
  fetchComments: async (movieId) => {
    try {
      const res = await fetch(`/api/v1/comments/${movieId}`);
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to fetch comments:", errorText);
        return;
      }

      const data = await res.json();

      if (data && Array.isArray(data.comments)) {
        set((state) => ({
          commentsByMovie: {
            ...state.commentsByMovie,
            [movieId]: data.comments,
          },
        }));
      } else {
        console.error("Invalid comment data:", data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },

  // Thêm bình luận mới
  addComment: async (content, movieId) => {
    if (!content.trim()) {
      console.error("Content is required but missing");
      return;
    }

    try {
      const res = await fetch('/api/v1/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Đảm bảo token có trong localStorage
        },
        body: JSON.stringify({ content, movieId }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to add comment:", errorText);
        return;
      }

      const data = await res.json();

      if (data && data.comment) {
        const newComment = data.comment;
        set((state) => ({
          commentsByMovie: {
            ...state.commentsByMovie,
            [movieId]: [...(state.commentsByMovie[movieId] || []), newComment],
          },
        }));
      } else {
        console.error("Invalid comment structure:", data);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  },

  // Xóa bình luận
  deleteComment: async (id, movieId) => {
    try {
      const res = await fetch(`/api/v1/comments/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Đảm bảo token có trong localStorage
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to delete comment:", errorText);
        return;
      }

      set((state) => ({
        commentsByMovie: {
          ...state.commentsByMovie,
          [movieId]: state.commentsByMovie[movieId]?.filter(
            (comment) => comment._id !== id
          ),
        },
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  },
  updateComment: async (id, content, movieId) => {
    if (!content.trim()) {
      console.error("Content is required but missing");
      return;
    }

    try {
      const res = await fetch(`/api/v1/comments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Đảm bảo token có trong localStorage
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Failed to update comment:", errorText);
        return;
      }

      const data = await res.json();

      if (data && data.comment) {
        const updatedComment = data.comment;

        set((state) => ({
          commentsByMovie: {
            ...state.commentsByMovie,
            [movieId]: state.commentsByMovie[movieId]?.map((comment) =>
              comment._id === id ? updatedComment : comment
            ),
          },
        }));
      } else {
        console.error("Invalid comment structure:", data);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  },
}));
