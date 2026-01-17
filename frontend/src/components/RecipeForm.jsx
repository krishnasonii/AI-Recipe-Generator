import { useState } from "react";
import { generateRecipe } from "../services/api";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!ingredients.trim()) return;
    setLoading(true);
    const res = await generateRecipe(ingredients);
    setRecipe(res.data.recipe);
    setLoading(false);
  };

  // 🔥 FORMAT RECIPE TEXT INTO UI SECTIONS
  const formatRecipe = (text) => {
    const lines = text.split("\n").filter(Boolean);

    let title = "";
    let ingredients = [];
    let steps = [];
    let section = "";

    lines.forEach((line) => {
      const lower = line.toLowerCase();

      if (lower.includes("recipe name")) {
        title = line.replace(/###|recipe name:/gi, "").trim();
      } else if (lower.includes("ingredients")) {
        section = "ingredients";
      } else if (lower.includes("instructions") || lower.includes("steps")) {
        section = "steps";
      } else {
        if (section === "ingredients") {
          ingredients.push(line.replace(/^[-•]/, "").trim());
        }
        if (section === "steps") {
          steps.push(line.replace(/^\d+\.|^-/, "").trim());
        }
      }
    });

    return { title, ingredients, steps };
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-100 flex items-center px-4 py-10">

      {/* 🎨 Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 right-[-140px] w-[460px] h-[460px] bg-indigo-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-16 right-[-100px] w-[380px] h-[380px] bg-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-40 w-[220px] h-[220px] bg-pink-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* 🔷 MAIN CONTENT */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SECTION */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            AI Recipe <span className="text-indigo-600">Generator</span>
          </h1>

          <p className="text-slate-600 text-lg max-w-lg">
            Enter ingredients you have and instantly get a delicious,
            AI-generated recipe with clear cooking steps.
          </p>

          <ul className="space-y-3 text-slate-600">
            <li className="flex gap-2">✅ Smart ingredient combinations</li>
            <li className="flex gap-2">✅ Instant recipe generation</li>
            <li className="flex gap-2">✅ Clean & easy instructions</li>
          </ul>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200">

          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            🍳 Generate Your Recipe
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Example: jeera rice, onion, garlic
          </p>

          {/* INPUT */}
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={5}
            placeholder="Enter ingredients..."
            className="mt-5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          {/* BUTTON */}
          <div className="mt-5">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600
                         text-white font-semibold shadow-lg
                         hover:from-indigo-700 hover:to-violet-700
                         active:scale-95 transition-all
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Generating Recipe..." : "Generate Recipe"}
            </button>
          </div>

          {/* 🍽️ OUTPUT UI */}
          {recipe && (() => {
            const { title, ingredients, steps } = formatRecipe(recipe);

            return (
              <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6 max-h-96 overflow-y-auto">

                {/* TITLE */}
               <div className="flex items-center justify-between gap-3">
  <div className="flex items-center gap-2">
    <span className="text-2xl">🍽️</span>
    <h3 className="text-xl font-bold text-slate-800">
      {title || "Generated Recipe"}
    </h3>
  </div>

  <button
    onClick={() => navigator.clipboard.writeText(recipe)}
    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg
               bg-indigo-100 text-indigo-700 font-medium
               hover:bg-indigo-200 transition active:scale-95"
  >
    📋 Copy
  </button>
</div>


                {/* INGREDIENTS */}
                {ingredients.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-600 mb-2">
                      🧂 Ingredients
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                      {ingredients.map((item, index) => (
                        <li
                          key={index}
                          className="flex gap-2 bg-slate-50 border rounded-lg px-3 py-2 text-slate-700"
                        >
                          ✔ {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* STEPS */}
                {steps.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-indigo-600 mb-2">
                      👨‍🍳 Instructions
                    </h4>
                    <ol className="space-y-3 text-sm text-slate-700">
                      {steps.map((step, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-500 text-white text-xs font-bold">
                            {index + 1}
                          </span>
                          <p>{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
