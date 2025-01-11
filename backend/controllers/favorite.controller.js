
import Favorite from "../models/favorite.model.js";
// Add a favorite
export const addFavorite = async (req, res) => {
    try {
        const { itemId, type, title } = req.body;

        const existingFavorite = await Favorite.findOne({
            userId: req.user._id,
            itemId,
        });

        if (existingFavorite) {
            return res.status(400).json({
                success: false,
                message: "Item is already in favorites",
            });
        }

        const favorite = new Favorite({
            userId: req.user._id,
            itemId,
            type,
            title,
            // Thêm poster_path
        });

        await favorite.save();

        res.status(201).json({
            success: true,
            message: "Item added to favorites",
            favorite,
        });
    } catch (error) {
        console.error("Error adding favorite:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Get all favorites for a user
export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ userId: req.user._id });

        res.status(200).json({
            success: true,
            favorites,
        });
    } catch (error) {
        console.error("Error fetching favorites:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Remove a favorite
export const removeFavorite = async (req, res) => {
    try {
        const { itemId } = req.params;

        // Xóa mục yêu thích
        const deletedFavorite = await Favorite.findOneAndDelete({
            userId: req.user._id,
            itemId,
        });

        if (!deletedFavorite) {
            return res.status(404).json({
                success: false,
                message: "Favorite item not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Item removed from favorites",
        });
    } catch (error) {
        console.error("Error removing favorite:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
export const isFavorite = async (req, res) => {
    try {
        const { itemId } = req.params;

        const favorite = await Favorite.findOne({
            userId: req.user._id,
            itemId,
        });

        res.status(200).json({
            success: true,
            isFavorite: !!favorite,
        });
    } catch (error) {
        console.error("Error checking favorite:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};