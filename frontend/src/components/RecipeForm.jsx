import { useState } from "react";
import { generateRecipe } from "../services/api";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await generateRecipe(ingredients);
    setRecipe(res.data.recipe);
    setLoading(false);
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 flex justify-center px-4 py-10">
    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
      

      <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
        🍳 AI Recipe Generator
      </h2>
      <p className="text-slate-500 mt-1">
        Enter ingredients and get an instant AI-generated recipe
      </p>

      {/* Input */}
      <textarea
        placeholder="e.g. jeera rice, onion, garlic"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        rows={4}
        className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

  
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                     bg-gradient-to-r from-indigo-600 to-violet-600 
                     text-white font-semibold shadow-md 
                     hover:from-indigo-700 hover:to-violet-700 
                     active:scale-95 transition-all duration-200 
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Generating...
            </>
          ) : (
            "Generate Recipe"
          )}
        </button>

        {recipe && (
          <button
            onClick={() => navigator.clipboard.writeText(recipe)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl 
                       bg-white border border-slate-300 
                       text-slate-700 font-medium shadow-sm
                       hover:bg-slate-100 hover:border-slate-400
                       active:scale-95 transition-all duration-200"
          >
            📋 Copy Recipe
          </button>
        )}
      </div>

   
      {recipe && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            🍽️ Generated Recipe
          </h3>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
            {recipe}
          </pre>
        </div>
      )}
    </div>
  </div>
);


};

export default RecipeForm;
