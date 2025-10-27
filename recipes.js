import { getSortedRecipes, filterRecipesByQuery } from "./recipe-utils.js";

const SHOPPING_LIST_KEY = "menu-magique-shopping-list";
const CHUNK_SIZE = 28;

const ALL_RECIPES = getSortedRecipes();
let visibleRecipes = ALL_RECIPES;
let activeRecipeQuery = "";

const recipeListEl = document.getElementById("recipeList");
const recipeSearchInput = document.getElementById("recipeSearch");
const recipeSearchClear = document.getElementById("recipeSearchClear");
const recipeSearchCount = document.getElementById("recipeSearchCount");
const shoppingListEl = document.getElementById("shoppingList");
const shoppingListEmptyEl = document.getElementById("shoppingListEmpty");
const clearShoppingListButton = document.getElementById("clearShoppingList");
const toastEl = document.getElementById("recipeToast");

let shoppingList = loadShoppingList();
let toastTimer = null;
let pendingHash = window.location.hash.replace(/^#/, "");

applyIOSBodyClasses();
renderRecipes();
renderShoppingList();

if (clearShoppingListButton) {
  clearShoppingListButton.addEventListener("click", () => {
    if (!shoppingList.length) {
      showToast("La liste est déjà vide.");
      return;
    }
    shoppingList = [];
    saveShoppingList();
    renderShoppingList();
    showToast("Liste de courses vidée.");
  });
}

if (recipeSearchInput) {
  recipeSearchInput.addEventListener("input", (event) => {
    applyRecipeSearch(event.target.value);
  });
}

if (recipeSearchClear) {
  recipeSearchClear.addEventListener("click", () => {
    if (!recipeSearchInput) {
      return;
    }
    if (recipeSearchInput.value === "") {
      recipeSearchInput.focus();
      return;
    }
    recipeSearchInput.value = "";
    applyRecipeSearch("");
    recipeSearchInput.focus();
  });
}

window.addEventListener("hashchange", () => {
  pendingHash = window.location.hash.replace(/^#/, "");
  if (
    pendingHash &&
    activeRecipeQuery.trim() &&
    !visibleRecipes.some((recipe) => recipe.id === pendingHash)
  ) {
    if (recipeSearchInput) {
      recipeSearchInput.value = "";
    }
    applyRecipeSearch("");
    return;
  }
  revealHashTarget();
});

function renderRecipes() {
  if (!recipeListEl) {
    return;
  }

  const list = visibleRecipes;
  recipeListEl.innerHTML = "";

  const summary = document.createElement("div");
  summary.className = "recipe-summary";
  const icon = document.createElement("span");
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "🍽️";
  summary.appendChild(icon);

  const summaryText = document.createElement("div");
  summaryText.className = "recipe-summary-text";

  const summaryLine = document.createElement("p");
  summaryLine.className = "recipe-summary-line";
  const countElement = document.createElement("strong");
  countElement.textContent = `${list.length}`;
  summaryLine.appendChild(countElement);

  if (activeRecipeQuery.trim()) {
    const plural = list.length > 1 ? "recettes" : "recette";
    summaryLine.appendChild(
      document.createTextNode(` ${plural} trouvée${list.length > 1 ? "s" : ""} pour `)
    );
    const highlight = document.createElement("mark");
    highlight.textContent = activeRecipeQuery.trim();
    summaryLine.appendChild(highlight);
    summaryLine.appendChild(document.createTextNode("."));
  } else {
    summaryLine.appendChild(
      document.createTextNode(" recettes faciles et rapides vous attendent.")
    );
  }

  summaryText.appendChild(summaryLine);

  const summaryHelp = document.createElement("p");
  summaryHelp.className = "recipe-summary-subline";
  summaryHelp.textContent =
    "Parcourez-les ou ajoutez leurs ingrédients à votre liste en un clic.";
  summaryText.appendChild(summaryHelp);

  summary.appendChild(summaryText);
  recipeListEl.appendChild(summary);

  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent =
      "Aucune recette ne correspond à votre recherche pour le moment.";
    recipeListEl.appendChild(empty);
    updateRecipeSearchCount();
    return;
  }

  const container = document.createElement("div");
  container.className = "recipe-card-list";
  recipeListEl.appendChild(container);

  let index = 0;

  const renderChunk = () => {
    const fragment = document.createDocumentFragment();
    for (let count = 0; count < CHUNK_SIZE && index < list.length; count += 1) {
      fragment.appendChild(createRecipeCard(list[index]));
      index += 1;
    }
    container.appendChild(fragment);
    revealHashTarget();
    if (index < list.length) {
      scheduleNextChunk();
    }
  };

  const scheduleNextChunk = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(renderChunk);
    } else {
      window.setTimeout(renderChunk, 16);
    }
  };

  scheduleNextChunk();
  updateRecipeSearchCount();
}

function applyRecipeSearch(value) {
  const nextQuery = (value || "").toString();
  if (nextQuery === activeRecipeQuery) {
    return;
  }
  activeRecipeQuery = nextQuery;
  visibleRecipes = filterRecipesByQuery(activeRecipeQuery);
  renderRecipes();
}

function updateRecipeSearchCount() {
  if (!recipeSearchCount) {
    return;
  }

  const query = activeRecipeQuery.trim();
  const count = visibleRecipes.length;
  if (count === 0) {
    recipeSearchCount.textContent = query
      ? "Aucune recette pour « " + query + " » pour l'instant."
      : "Aucune recette disponible pour le moment.";
    return;
  }

  const plural = count > 1 ? "recettes" : "recette";
  if (query) {
    const suffix = count > 1 ? "s" : "";
    recipeSearchCount.textContent =
      count +
      " " +
      plural +
      " trouvée" +
      suffix +
      " pour « " +
      query +
      " ».";
  } else {
    const suffix = count > 1 ? "s" : "";
    recipeSearchCount.textContent =
      count + " " + plural + " affichée" + suffix + ".";
  }
}

function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recipe-card";
  card.id = recipe.id;
  card.dataset.category = recipe.category || "Facile & rapide";

  const header = document.createElement("header");
  header.className = "recipe-card-header";

  const title = document.createElement("h2");
  title.textContent = recipe.title;
  header.appendChild(title);

  const badge = document.createElement("span");
  badge.className = "recipe-card-badge";
  badge.textContent = recipe.category || "Facile & rapide";
  header.appendChild(badge);

  card.appendChild(header);

  const meta = document.createElement("ul");
  meta.className = "recipe-meta";
  meta.innerHTML = `
    <li><span aria-hidden="true">🕑</span><strong>${recipe.prepTime} min</strong> de préparation</li>
    <li><span aria-hidden="true">🍳</span><strong>${recipe.cookTime} min</strong> de cuisson</li>
    <li><span aria-hidden="true">🔥</span><strong>${recipe.calories} kcal</strong></li>
  `;
  card.appendChild(meta);

  const highlights = document.createElement("div");
  highlights.className = "recipe-highlights";
  recipe.ingredients
    .slice(0, 3)
    .map((ingredient) => ingredient.item)
    .forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "recipe-highlight";
      chip.textContent = item;
      highlights.appendChild(chip);
    });
  card.appendChild(highlights);

  const sections = document.createElement("div");
  sections.className = "recipe-sections";

  const ingredientsSection = document.createElement("section");
  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingrédients";
  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "ingredient-list";
  recipe.ingredients.forEach((ingredient) => {
    const item = document.createElement("li");
    item.textContent = formatIngredient(ingredient);
    ingredientsList.appendChild(item);
  });
  ingredientsSection.appendChild(ingredientsTitle);
  ingredientsSection.appendChild(ingredientsList);

  const stepsSection = document.createElement("section");
  const stepsTitle = document.createElement("h3");
  stepsTitle.textContent = "Étapes";
  const stepsList = document.createElement("ol");
  stepsList.className = "recipe-steps";
  recipe.steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    stepsList.appendChild(li);
  });
  stepsSection.appendChild(stepsTitle);
  stepsSection.appendChild(stepsList);

  sections.appendChild(ingredientsSection);
  sections.appendChild(stepsSection);
  card.appendChild(sections);

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "primary-button btn-touch recipe-card-action";
  addButton.textContent = "Ajouter les ingrédients à la liste";
  addButton.addEventListener("click", () => handleAddIngredients(recipe));
  card.appendChild(addButton);

  return card;
}

function handleAddIngredients(recipe) {
  const newlyAdded = [];

  recipe.ingredients.forEach((ingredient) => {
    const label = formatIngredient(ingredient);
    if (!shoppingList.includes(label)) {
      shoppingList.push(label);
      newlyAdded.push(label);
    }
  });

  if (!newlyAdded.length) {
    showToast("Les ingrédients sont déjà sur votre liste.");
    return;
  }

  saveShoppingList();
  renderShoppingList();
  showToast(`${newlyAdded.length} ingrédient(s) ajouté(s).`);
}

function renderShoppingList() {
  if (!shoppingListEl || !shoppingListEmptyEl) {
    return;
  }

  shoppingListEl.innerHTML = "";

  if (!shoppingList.length) {
    shoppingListEl.hidden = true;
    shoppingListEmptyEl.hidden = false;
    return;
  }

  shoppingListEl.hidden = false;
  shoppingListEmptyEl.hidden = true;

  shoppingList.forEach((itemLabel) => {
    const li = document.createElement("li");
    li.className = "shopping-list-item";

    const span = document.createElement("span");
    span.textContent = itemLabel;
    li.appendChild(span);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "icon-button btn-touch";
    removeButton.setAttribute("aria-label", `Retirer ${itemLabel} de la liste`);
    removeButton.textContent = "✕";
    removeButton.addEventListener("click", () => removeIngredient(itemLabel));

    li.appendChild(removeButton);
    shoppingListEl.appendChild(li);
  });
}

function removeIngredient(itemLabel) {
  shoppingList = shoppingList.filter((item) => item !== itemLabel);
  saveShoppingList();
  renderShoppingList();
  showToast("Ingrédient retiré de la liste.");
}

function formatIngredient(ingredient) {
  return [ingredient.quantity, ingredient.item, ingredient.note]
    .filter(Boolean)
    .join(" ");
}

function revealHashTarget() {
  if (!pendingHash) {
    return;
  }
  const target = document.getElementById(pendingHash);
  if (!target) {
    return;
  }
  target.classList.add("recipe-card--highlighted");
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    target.classList.remove("recipe-card--highlighted");
  }, 1200);
  pendingHash = "";
}

function loadShoppingList() {
  try {
    const stored = localStorage.getItem(SHOPPING_LIST_KEY);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Impossible de charger la liste de courses", error);
    return [];
  }
}

function saveShoppingList() {
  try {
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(shoppingList));
  } catch (error) {
    console.warn("Impossible d'enregistrer la liste de courses", error);
  }
}

function showToast(message) {
  if (!toastEl) {
    return;
  }
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2200);
}

function isIOS() {
  const platform = (navigator.platform || "").toLowerCase();
  const userAgent = navigator.userAgent || "";
  const isAppleDevice = /iphone|ipad|ipod/.test(platform);
  const isTouchMac = /mac/.test(platform) && "ontouchend" in document;
  return isAppleDevice || (isTouchMac && /safari/i.test(userAgent));
}

function applyIOSBodyClasses() {
  if (isIOS()) {
    document.body.classList.add("ios");
  }
}
