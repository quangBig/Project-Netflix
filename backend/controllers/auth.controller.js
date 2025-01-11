import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
	try {
		const { email, password, username } = req.body;

		// Kiểm tra dữ liệu đầu vào
		if (!email || !password || !username) {
			return res.status(400).json({ success: false, message: "Tất cả các trường đều là bắt buộc" });
		}

		// Kiểm tra định dạng email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Email không hợp lệ" });
		}

		// Kiểm tra định dạng mật khẩu
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
		if (!passwordRegex.test(password)) {
			return res.status(400).json({
				success: false,
				message: "Mật khẩu phải chứa ít nhất một chữ cái, một số và một ký tự đặc biệt",
			});
		}

		// Kiểm tra trùng lặp email
		const existingUserByEmail = await User.findOne({ email });
		if (existingUserByEmail) {
			return res.status(400).json({ success: false, message: "Email đã tồn tại" });
		}

		// Tạo mật khẩu đã mã hóa
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// Chọn avatar ngẫu nhiên
		const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

		// Tạo người dùng mới
		const newUser = new User({ password: hashedPassword, email, username: username, image });

		// Sinh token và lưu cookie
		generateTokenAndSetCookie(newUser._id, res);
		await newUser.save();

		// Trả về phản hồi thành công
		res.status(201).json({
			success: true,
			user: {
				...newUser._doc,
				password: "", // Không trả về mật khẩu
			},
		});
	} catch (error) {
		console.error("Lỗi trong hàm signup:", error.message);
		res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
	}
}


export async function login(req, res) {
	try {
		const { email, password } = req.body;

		if (!email) {
			return res.status(400).json({ success: false, message: "Email is required" });
		}
		if (!password) {
			return res.status(400).json({ success: false, message: "Password is required" });
		}

		const user = await User.findOne({ email: email });
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function logout(req, res) {
	try {
		res.clearCookie("jwt-netflix");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function updateUser(req, res) {
	try {
		const userId = req.user.id; // ID người dùng từ token
		const { username, email, image } = req.body; // Thông tin cần cập nhật

		// Kiểm tra nếu không có dữ liệu nào được gửi
		if (!username && !email && !image) {
			return res.status(400).json({ success: false, message: "No data to update" });
		}
		if (email) {
			const existingUserByEmail = await User.findOne({ email });
			if (existingUserByEmail && existingUserByEmail._id.toString() !== userId) {
				return res.status(400).json({ success: false, message: "Email already in use" });
			}
		}

		if (username) {
			const existingUserByUsername = await User.findOne({ username });
			if (existingUserByUsername && existingUserByUsername._id.toString() !== userId) {
				return res.status(400).json({ success: false, message: "Username already in use" });
			}
		}
		// Tìm người dùng và cập nhật thông tin
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				...(username && { username }),
				...(email && { email }),
				...(image && { image }),
			},
			{ new: true } // Trả về dữ liệu mới sau khi cập nhật
		);

		if (!updatedUser) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		res.status(200).json({
			success: true,
			user: {
				...updatedUser._doc,
				password: "", // Không trả về mật khẩu
			},
		});
	} catch (error) {
		console.error("Error in updateUser controller:", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function updatePassword(req, res) {
	try {
		const userId = req.user.id; // ID người dùng từ token
		const { oldPassword, newPassword, confirmPassword } = req.body;

		// Kiểm tra dữ liệu đầu vào
		if (!oldPassword || !newPassword || !confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "Old password, new password, and confirm password are all required",
			});
		}

		// Kiểm tra mật khẩu mới và mật khẩu xác nhận có khớp không
		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "New password and confirm password do not match",
			});
		}

		// Kiểm tra định dạng mật khẩu mới
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).+$/; // Kiểm tra chữ cái, số và ký tự đặc biệt
		if (!passwordRegex.test(newPassword)) {
			return res.status(400).json({
				success: false,
				message: "New password must contain at least one letter, one number, and one special character",
			});
		}

		// Tìm người dùng trong cơ sở dữ liệu
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		// Kiểm tra mật khẩu cũ
		const isOldPasswordCorrect = await bcryptjs.compare(oldPassword, user.password);
		if (!isOldPasswordCorrect) {
			return res.status(400).json({
				success: false,
				message: "Old password is incorrect",
			});
		}

		// Mã hóa mật khẩu mới
		const salt = await bcryptjs.genSalt(10);
		const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

		// Cập nhật mật khẩu trong cơ sở dữ liệu
		user.password = hashedNewPassword;
		await user.save();

		// Trả về thông báo thành công
		res.status(200).json({
			success: true,
			message: "Password updated successfully",
		});
	} catch (error) {
		console.error("Error in updatePassword controller:", error.message);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
}

