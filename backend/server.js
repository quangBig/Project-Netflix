import express from "express";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import commentRoutes from "./routes/comment.route.js";
import favoriteRoute from "./routes/favorite.route.js";
// import MovieTvFavoritesRouters from "./routes/favorites.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use("/api/v1/comments", protectRoute, commentRoutes);
app.use("/api/v1/favorites", protectRoute, favoriteRoute);
// app.use("/api/v1/favorites", protectRoute, MovieTvFavoritesRouters);


app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT);
	connectDB();
});
