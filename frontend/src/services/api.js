import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateRecipe = (ingredients) =>
  API.post("/recipe/generate", { ingredients });
