import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "",
	},
	searchHistory: {
		type: [
			{
				id: { type: Number, required: true },
				image: { type: String, default: "" },
				title: { type: String, required: true },
				searchType: { type: String, required: true },
				createdAt: { type: Date, default: Date.now },
			},
		],
		default: [],
	},

});

export const User = mongoose.model("User", userSchema);
