import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: Number, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);