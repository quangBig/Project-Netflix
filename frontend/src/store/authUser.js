import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const userAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true })
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials)
            set({ user: response.data.user, isSigningUp: false })
            toast.success("Accout created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed")
            set({ isSigningUp: false, user: null })
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true })
        try {
            const response = await axios.post("/api/v1/auth/login", credentials)
            set({ user: response.data.user, isLoggingIn: false })
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Login failed")
            set({ isLoggingIn: false, user: null })
        }
    },
    logout: async () => {
        set({ isLoggingOut: true })
        try {
            await axios.post("/api/v1/auth/logout")
            set({ user: null, isLoggingOut: false })
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed")
            set({ isLoggingOut: false })
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true })
        try {
            const response = await axios.get("/api/v1/auth/authCheck")
            set({ user: response.data.user, isCheckingAuth: false })
        } catch (error) {
            set({ isCheckingAuth: false, user: null })
        }
    }, updateUser: async (updates) => {
        try {
            const response = await axios.put("/api/v1/auth/update", updates, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            set({ user: response.data.user });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Failed to update profile");
        }
    },
    updatePassword: async ({ oldPassword, newPassword }) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.put('/api/v1/auth/update-password', { oldPassword, newPassword });
            set({ loading: false });
            return response.data; // Trả về kết quả thành công
        } catch (error) {
            set({ error: error.response.data.message, loading: false });
            throw new Error(error.response.data.message);
        }
    },
}))