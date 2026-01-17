import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import recipeRoute from "./routes/recipe.route.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/recipe", recipeRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
