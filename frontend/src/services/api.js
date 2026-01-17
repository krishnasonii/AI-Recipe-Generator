import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const generateRecipe = (ingredients) =>
  API.post("/api/recipe/generate", { ingredients });
