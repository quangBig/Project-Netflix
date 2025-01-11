import { create } from 'zustand';
import axios from 'axios';

const useFavoriteStore = create((set, get) => ({
    favorites: [], // Danh sách các mục yêu thích
    loading: false, // Trạng thái tải
    error: null, // Lỗi nếu có

    // Lấy danh sách yêu thích từ server
    fetchFavorites: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get('/api/v1/favorites', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Thay token bằng token lưu trữ của bạn
                },
            });
            set({ favorites: response.data.favorites, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to fetch favorites',
                loading: false,
            });
        }
    },

    // Thêm mục yêu thích
    addFavorite: async (favorite) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post('/api/v1/favorites', favorite, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            set((state) => ({
                favorites: [...state.favorites, response.data.favorite],
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to add favorite',
                loading: false,
            });
        }
    },

    // Xóa mục yêu thích
    removeFavorite: async (itemId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/v1/favorites/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            set((state) => ({
                favorites: state.favorites.filter((fav) => fav.itemId !== itemId),
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Failed to remove favorite',
                loading: false,
            });
        }
    },

    // Kiểm tra mục yêu thích
    isFavorite: (itemId) => {
        const { favorites } = get();
        return favorites.some((fav) => fav.itemId === itemId);
    },
}));

export default useFavoriteStore;
