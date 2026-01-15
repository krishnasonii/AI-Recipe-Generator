import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    ingredients: {
      type: String,
      required: true,
    },
    recipeText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
