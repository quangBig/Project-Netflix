import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        itemId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["movie", "tvshow"],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },

    },
    { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);
