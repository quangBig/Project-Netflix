import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Đảm bảo target đúng
        changeOrigin: true, // Thêm tùy chọn này nếu cần
        secure: false, // Thêm tùy chọn này nếu cần
      },
    },
  },
  base: "Netflix",
});