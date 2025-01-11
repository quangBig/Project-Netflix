import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
	try {
		// Lấy token từ cookies
		const token = req.cookies?.["jwt-netflix"];

		// Kiểm tra nếu không có token
		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - No Token Provided",
			});
		}

		// Xác minh token
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		// Kiểm tra nếu token không hợp lệ
		if (!decoded || !decoded.userId) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - Invalid Token",
			});
		}

		// Lấy thông tin user từ database
		const user = await User.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Gắn thông tin user vào req để các middleware hoặc route handler tiếp theo có thể sử dụng
		req.user = user;

		// Tiếp tục xử lý request
		next();
	} catch (error) {
		console.error("Error in protectRoute middleware:", error.message);

		if (error.name === "JsonWebTokenError") {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - Invalid Token",
			});
		}

		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - Token Expired",
			});
		}

		// Lỗi server nội bộ
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};
