import express from "express";
import openai from "../utils/openai.js";
import Recipe from "../models/recipe.model.js";

const router = express.Router();

// Generate & save Recipe
router.post("/generate", async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({ error: "Ingredients are required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create a healthy recipe using: ${ingredients}.
Include:
- Recipe name
- Ingredients
- Steps
- Cooking time
- Calories`,
        },
      ],
    });

    const recipeText = response.choices[0].message.content;

    const newRecipe = await Recipe.create({
      ingredients,
      recipeText,
    });


    res.status(201).json({
      recipe: recipeText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Recipe generation failed" });
  }
});


// all recipe history
router.get("/all", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

export default router;
