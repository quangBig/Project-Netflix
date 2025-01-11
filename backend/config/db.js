import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
export const connectDB = async () => {
	try {
		const con = await mongoose.connect(ENV_VARS.MONGO_URL)
		console.log("DB connected", con.connection.host)
	}
	catch (error) {
		console.log("Error in DB connection", error.massage)
		process.exit(1)
	}
}