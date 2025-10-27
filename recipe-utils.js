import { RECIPE_DATA } from "./recipe-data.js";

const SORTED_RECIPES = RECIPE_DATA.slice().sort((a, b) =>
  a.title.localeCompare(b.title, "fr")
);

const RECIPE_TOKEN_LOOKUP = new Map();

function buildSearchTokens(recipe) {
  if (RECIPE_TOKEN_LOOKUP.has(recipe.id)) {
    return RECIPE_TOKEN_LOOKUP.get(recipe.id);
  }

  const tokens = [recipe.title, recipe.category]
    .concat(
      (recipe.ingredients || []).map((ingredient) =>
        [ingredient.quantity, ingredient.item, ingredient.note]
          .filter(Boolean)
          .join(" ")
      )
    )
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  RECIPE_TOKEN_LOOKUP.set(recipe.id, tokens);
  return tokens;
}

const RECIPE_SUGGESTIONS = SORTED_RECIPES.map((recipe) => ({
  id: recipe.id,
  label: recipe.title,
  category: recipe.category || "Facile & rapide",
  prepTime: recipe.prepTime,
  cookTime: recipe.cookTime,
  calories: recipe.calories,
  highlights: (recipe.ingredients || []).slice(0, 3).map((ingredient) => ingredient.item),
  searchTokens: buildSearchTokens(recipe),
}));

export function getSortedRecipes() {
  return SORTED_RECIPES;
}

export function filterRecipesByQuery(query) {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return SORTED_RECIPES;
  }
  return SORTED_RECIPES.filter((recipe) =>
    buildSearchTokens(recipe).includes(normalized)
  );
}

export function getRecipeSuggestions() {
  return RECIPE_SUGGESTIONS;
}

function normalizeQuery(value) {
  return (value || "").toString().trim().toLowerCase();
}
