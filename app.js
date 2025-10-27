const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const mealSlots = [
  { key: "lunch", label: "Midi", icon: "☀️" },
  { key: "dinner", label: "Soir", icon: "🌙" },
];

const mealSlotLabels = mealSlots.reduce((acc, slot) => {
  acc[slot.key] = slot.label;
  return acc;
}, {});

const STORAGE_KEYS = {
  plan: "menu-magique-plan",
  recipes: "menu-magique-recipes",
};

const defaultSuggestions = [
  {
    label: "Salade César au poulet",
    category: "Rapide",
    description:
      "Poulet grillé, romaine croquante, copeaux de parmesan et sauce légère au citron.",
  },
  {
    label: "Quiche aux poireaux",
    category: "Végétarien",
    description:
      "Fond de tarte croustillant garni de poireaux fondants et d'une royale à la crème.",
  },
  {
    label: "Pâtes au pesto maison",
    category: "Végétarien",
    description:
      "Spaghettis nappés d'un pesto basilic-cajou et parsemés de tomates confites.",
  },
  {
    label: "Curry de pois chiches",
    category: "Végétarien",
    description:
      "Pois chiches mijotés dans un lait de coco épicé, servis avec du riz parfumé.",
  },
  {
    label: "Saumon teriyaki et riz",
    category: "Poisson",
    description: "Filet de saumon laqué teriyaki, riz japonais et brocoli vapeur.",
  },
  {
    label: "Pad thaï aux crevettes",
    category: "Poisson",
    description:
      "Nouilles de riz sautées, crevettes, cacahuètes croquantes et pousses de soja.",
  },
  {
    label: "Wok de légumes croquants",
    category: "Rapide",
    description:
      "Mélange de légumes de saison sautés au wok, sauce soja-sésame.",
  },
  {
    label: "Poulet rôti et légumes racines",
    category: "Classique",
    description:
      "Pilons dorés au four avec carottes, panais et jus parfumé au thym.",
  },
  {
    label: "Soupe thaï coco",
    category: "Réconfort",
    description:
      "Bouillon coco-citronnelle, champignons, poulet émincé et coriandre fraîche.",
  },
  {
    label: "Buddha bowl quinoa & tofu",
    category: "Végétarien",
    description:
      "Quinoa, tofu grillé, légumes croquants, edamame et sauce tahini-citron.",
  },
  {
    label: "Tacos au bœuf effiloché",
    category: "Convivial",
    description:
      "Tortillas moelleuses garnies de bœuf mijoté, salsa fraîche et avocat.",
  },
  {
    label: "Lasagnes aux légumes",
    category: "Famille",
    description: "Feuilles de pâte, légumes rôtis, ricotta et mozzarella gratinée.",
  },
  {
    label: "Boulettes suédoises et purée",
    category: "Famille",
    description:
      "Boulettes de bœuf sauce crème-brun, purée onctueuse et confiture d'airelles.",
  },
  {
    label: "Poke bowl au thon",
    category: "Poisson",
    description:
      "Riz vinaigré, thon mariné, mangue, concombre et algues croustillantes.",
  },
  {
    label: "Risotto aux champignons",
    category: "Végétarien",
    description:
      "Arborio crémeux aux champignons poêlés, parmesan et huile de truffe.",
  },
  {
    label: "Omelette aux herbes fraîches",
    category: "Rapide",
    description:
      "Oeufs battus, herbes du jardin et salade de jeunes pousses.",
  },
  {
    label: "Bœuf bourguignon express",
    category: "Réconfort",
    description:
      "Bœuf fondant mijoté au vin rouge, champignons et carottes glacées.",
  },
  {
    label: "Chili sin carne",
    category: "Végétarien",
    description:
      "Haricots rouges, maïs, poivrons et épices fumées, servis avec riz ou tortillas.",
  },
  {
    label: "Galettes de sarrasin complètes",
    category: "Classique",
    description:
      "Galette bretonne garnie d'œuf, jambon, fromage et salade croquante.",
  },
  {
    label: "Poisson en papillote citronné",
    category: "Poisson",
    description:
      "Filet de poisson cuisson papillote, citron, fenouil et herbes fraîches.",
  },
];

const plannerEl = document.getElementById("planner");
const suggestionSheet = document.getElementById("suggestionSheet");
const suggestionGrid = document.getElementById("suggestionGrid");
const suggestionSearch = document.getElementById("suggestionSearch");
const toastEl = document.getElementById("toast");
const recipeTags = document.getElementById("recipeTags");

let planState = loadPlan();
let customRecipes = loadRecipes();
let activeSlot = null;
let dragPayload = null;

function loadPlan() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.plan);
    if (!data) {
      return createEmptyPlan();
    }
    const parsed = JSON.parse(data);
    return days.reduce((acc, day) => {
      const saved = parsed[day] || {};
      acc[day] = {
        lunch: saved.lunch || "",
        dinner: saved.dinner || "",
      };
      return acc;
    }, {});
  } catch (error) {
    console.warn("Impossible de charger le plan enregistré", error);
    return createEmptyPlan();
  }
}

function loadRecipes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.recipes);
    if (!stored) {
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Impossible de charger les recettes", error);
    return [];
  }
}

function createEmptyPlan() {
  return days.reduce((acc, day) => {
    acc[day] = { lunch: "", dinner: "" };
    return acc;
  }, {});
}

function savePlan() {
  try {
    localStorage.setItem(STORAGE_KEYS.plan, JSON.stringify(planState));
  } catch (error) {
    console.warn("Sauvegarde impossible", error);
  }
}

function saveRecipes() {
  try {
    localStorage.setItem(STORAGE_KEYS.recipes, JSON.stringify(customRecipes));
  } catch (error) {
    console.warn("Sauvegarde des recettes impossible", error);
  }
}

function getAllSuggestions() {
  const merged = [...defaultSuggestions];
  customRecipes.forEach((recipe) => {
    if (!merged.some((item) => item.label === recipe.label)) {
      merged.push(recipe);
    }
  });
  return merged.sort((a, b) => a.label.localeCompare(b.label));
}

function renderPlanner() {
  const dayTemplate = document.getElementById("day-template");
  const mealTemplate = document.getElementById("meal-template");
  plannerEl.innerHTML = "";

  days.forEach((day) => {
    const dayFragment = dayTemplate.content.cloneNode(true);
    const dayCard = dayFragment.querySelector(".day-card");
    const dayNameEl = dayFragment.querySelector('[data-slot="day-name"]');
    const mealsContainer = dayFragment.querySelector(".meals");
    dayNameEl.textContent = day;

    mealSlots.forEach((slot) => {
      const mealFragment = mealTemplate.content.cloneNode(true);
      const mealCard = mealFragment.querySelector(".meal-card");
      const mealName = mealFragment.querySelector('[data-slot="meal-name"]');
      const textarea = mealFragment.querySelector('[data-role="meal-input"]');
      const suggestionButton = mealFragment.querySelector(
        '[data-action="open-suggestions"]'
      );
      const clearButton = mealFragment.querySelector(
        '[data-action="clear-meal"]'
      );

      mealName.textContent = `${slot.icon} ${slot.label}`;
      textarea.value = planState[day][slot.key];
      textarea.dataset.day = day;
      textarea.dataset.slot = slot.key;

      textarea.addEventListener("input", handleMealInput, { passive: true });
      textarea.addEventListener("dragenter", handleMealDragEnter);
      textarea.addEventListener("dragover", handleMealDragOver);
      textarea.addEventListener("dragleave", handleMealDragLeave);
      textarea.addEventListener("drop", handleMealDrop);
      suggestionButton.addEventListener("click", () =>
        openSuggestionSheet(day, slot.key)
      );
      clearButton.addEventListener("click", () => clearMeal(day, slot.key));

      mealCard.dataset.day = day;
      mealCard.dataset.slot = slot.key;
      mealCard.draggable = true;
      mealCard.addEventListener("dragstart", handleMealDragStart);
      mealCard.addEventListener("dragend", handleMealDragEnd);
      mealCard.addEventListener("dragenter", handleMealDragEnter);
      mealCard.addEventListener("dragover", handleMealDragOver);
      mealCard.addEventListener("dragleave", handleMealDragLeave);
      mealCard.addEventListener("drop", handleMealDrop);

      mealsContainer.appendChild(mealFragment);
    });

    const clearDayButton = dayFragment.querySelector(
      '[data-action="clear-day"]'
    );
    clearDayButton.addEventListener("click", () => clearDay(day));

    plannerEl.appendChild(dayFragment);
  });
}

function handleMealInput(event) {
  const { day, slot } = event.target.dataset;
  setMealValue(day, slot, event.target.value);
  savePlan();
}

function clearMeal(day, slot) {
  setMealValue(day, slot, "");
  const textarea = plannerEl.querySelector(
    `textarea[data-day="${day}"][data-slot="${slot}"]`
  );
  if (textarea) {
    textarea.focus();
  }
  savePlan();
}

function clearDay(day) {
  mealSlots.forEach((slot) => {
    setMealValue(day, slot.key, "");
  });
  plannerEl
    .querySelectorAll(`textarea[data-day="${day}"]`)
    .forEach((textarea) => {
      textarea.value = "";
    });
  savePlan();
  showToast(`La journée ${day} a été réinitialisée.`);
}

function openSuggestionSheet(day, slotKey) {
  activeSlot = { day, slotKey };
  suggestionSheet.classList.remove("hidden");
  suggestionSheet.setAttribute("aria-hidden", "false");
  suggestionSearch.value = "";
  renderSuggestionGrid();
  suggestionSearch.focus({ preventScroll: false });
}

function closeSuggestionSheet() {
  activeSlot = null;
  suggestionSheet.classList.add("hidden");
  suggestionSheet.setAttribute("aria-hidden", "true");
}

function renderSuggestionGrid(filterText = "") {
  const suggestions = getAllSuggestions().filter(({ label }) =>
    label.toLowerCase().includes(filterText.toLowerCase())
  );

  suggestionGrid.innerHTML = "";

  if (suggestions.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Aucune suggestion trouvée.";
    empty.className = "empty-state";
    suggestionGrid.appendChild(empty);
    return;
  }

  suggestions.forEach((suggestion) => {
    const card = document.createElement("article");
    card.className = "suggestion-card";
    card.dataset.label = suggestion.label;
    card.draggable = true;
    card.tabIndex = 0;
    card.setAttribute("role", "group");
    card.innerHTML = `
      <div class="suggestion-card-header">
        <h3>${suggestion.label}</h3>
        <span class="suggestion-chip">${suggestion.category || "Perso"}</span>
      </div>
      <p>${
        suggestion.description ||
        "Idée personnalisée sans description. Ajoutez vos notes directement dans le planning."
      }</p>
      <div class="suggestion-card-actions">
        <button type="button" class="primary-button">Utiliser</button>
      </div>
    `;

    const actionButton = card.querySelector("button");
    actionButton.addEventListener("click", () => applySuggestion(suggestion.label));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applySuggestion(suggestion.label);
      }
    });

    card.addEventListener("dragstart", (event) =>
      handleSuggestionDragStart(event, suggestion.label)
    );
    card.addEventListener("dragend", handleSuggestionDragEnd);

    suggestionGrid.appendChild(card);
  });
}

function applySuggestion(value) {
  if (!activeSlot) return;
  const { day, slotKey } = activeSlot;
  setMealValue(day, slotKey, value);
  savePlan();
  closeSuggestionSheet();
}

function generateWeek() {
  const suggestions = getAllSuggestions();
  const randomItem = () =>
    suggestions[Math.floor(Math.random() * suggestions.length)]?.label || "";

  days.forEach((day) => {
    mealSlots.forEach((slot) => {
      const value = randomItem();
      setMealValue(day, slot.key, value);
    });
  });
  savePlan();
  showToast("Une nouvelle semaine de repas a été générée.");
}

function exportWeek() {
  const lines = [];
  days.forEach((day) => {
    lines.push(`📅 ${day}`);
    mealSlots.forEach((slot) => {
      const value = planState[day][slot.key] || "À définir";
      lines.push(` • ${slot.label} : ${value}`);
    });
    lines.push("");
  });

  const exportText = lines.join("\n");
  if (navigator.clipboard?.writeText) {
    navigator.clipboard
      .writeText(exportText)
      .then(() => showToast("Plan copié dans le presse-papiers."))
      .catch(() => showExportPrompt(exportText));
  } else {
    showExportPrompt(exportText);
  }
}

function showExportPrompt(text) {
  const promptWindow = window.open("", "export", "width=320,height=520");
  if (!promptWindow) {
    alert(text);
    return;
  }
  promptWindow.document.write(`<pre style="font-family: -apple-system, sans-serif; white-space: pre-wrap; padding: 16px;">${text}</pre>`);
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2400);
}

function handleRecipeSubmit(event) {
  event.preventDefault();
  const input = event.target.elements.recipe;
  const value = input.value.trim();
  if (!value) return;

  if (customRecipes.some((recipe) => recipe.label === value)) {
    showToast("Cette idée est déjà enregistrée.");
    input.value = "";
    return;
  }

  customRecipes.push({ label: value, category: "Perso" });
  saveRecipes();
  renderRecipeTags();
  showToast("Idée ajoutée à la bibliothèque !");
  input.value = "";
}

function renderRecipeTags() {
  recipeTags.innerHTML = "";
  const suggestions = getAllSuggestions();

  suggestions.slice(0, 30).forEach((suggestion) => {
    const tag = document.createElement("span");
    tag.className = "recipe-tag";
    tag.textContent = suggestion.label;
    tag.title = suggestion.description || suggestion.category || "Idée de repas";
    tag.draggable = true;
    tag.dataset.label = suggestion.label;
    tag.addEventListener("dragstart", (event) =>
      handleSuggestionDragStart(event, suggestion.label)
    );
    tag.addEventListener("dragend", handleSuggestionDragEnd);
    recipeTags.appendChild(tag);
  });
}

function setMealValue(day, slot, value) {
  planState[day][slot] = value;
  const textarea = plannerEl.querySelector(
    `textarea[data-day="${day}"][data-slot="${slot}"]`
  );
  if (textarea && textarea.value !== value) {
    textarea.value = value;
  }
}

function handleMealDragStart(event) {
  const card = event.currentTarget;
  const { day, slot } = card.dataset;
  const value = planState[day][slot];
  if (!value) {
    event.preventDefault();
    return;
  }

  dragPayload = { type: "meal", day, slot, value };
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", value);
    try {
      event.dataTransfer.setData("application/json", JSON.stringify(dragPayload));
    } catch (error) {
      // Safari iOS n'autorise pas toujours les types personnalisés.
    }
  }
  card.classList.add("is-dragging");
}

function handleMealDragEnd(event) {
  event.currentTarget.classList.remove("is-dragging");
  dragPayload = null;
}

function handleMealDragEnter(event) {
  event.preventDefault();
  const card =
    event.currentTarget.classList.contains("meal-card")
      ? event.currentTarget
      : event.currentTarget.closest(".meal-card");
  card?.classList.add("is-drop-target");
}

function handleMealDragOver(event) {
  if (event.dataTransfer) {
    event.preventDefault();
    const payload = dragPayload || getDragData(event);
    event.dataTransfer.dropEffect = payload?.type === "meal" ? "move" : "copy";
  }
}

function handleMealDragLeave(event) {
  const card =
    event.currentTarget.classList.contains("meal-card")
      ? event.currentTarget
      : event.currentTarget.closest(".meal-card");
  card?.classList.remove("is-drop-target");
}

function handleMealDrop(event) {
  event.preventDefault();
  const targetCard =
    event.currentTarget.classList.contains("meal-card")
      ? event.currentTarget
      : event.currentTarget.closest(".meal-card");
  targetCard?.classList.remove("is-drop-target");

  const payload = dragPayload || getDragData(event);
  if (!payload) return;

  const { day, slot } = event.currentTarget.dataset;

  if (payload.type === "suggestion") {
    setMealValue(day, slot, payload.value);
    savePlan();
    showToast(`Suggestion ajoutée à ${day} (${mealSlotLabels[slot]}).`);
    return;
  }

  if (payload.type === "meal") {
    const { day: sourceDay, slot: sourceSlot } = payload;
    const sourceValue = planState[sourceDay][sourceSlot];
    const targetValue = planState[day][slot];

    if (sourceDay === day && sourceSlot === slot) {
      return;
    }

    setMealValue(day, slot, sourceValue);
    setMealValue(sourceDay, sourceSlot, targetValue);
    savePlan();

    if (targetValue) {
      showToast(`Repas échangé avec ${day} (${mealSlotLabels[slot]}).`);
    } else {
      showToast(`Repas déplacé vers ${day} (${mealSlotLabels[slot]}).`);
    }
  }
}

function handleSuggestionDragStart(event, value) {
  if (!suggestionSheet.classList.contains("hidden")) {
    closeSuggestionSheet();
  }
  dragPayload = { type: "suggestion", value };
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", value);
    try {
      event.dataTransfer.setData(
        "application/json",
        JSON.stringify({ type: "suggestion", value })
      );
    } catch (error) {
      // Types personnalisés indisponibles sur certains navigateurs mobiles.
    }
  }
  event.currentTarget.classList.add("is-dragging");
}

function handleSuggestionDragEnd(event) {
  event.currentTarget.classList.remove("is-dragging");
  dragPayload = null;
}

function getDragData(event) {
  if (!event.dataTransfer) {
    return dragPayload;
  }

  try {
    const raw = event.dataTransfer.getData("application/json");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (error) {
    return dragPayload;
  }

  const fallback = event.dataTransfer.getData("text/plain");
  if (fallback && dragPayload?.type === "suggestion") {
    return { type: "suggestion", value: fallback };
  }
  return dragPayload;
}

function registerEvents() {
  document
    .getElementById("generateWeek")
    .addEventListener("click", generateWeek);
  document
    .getElementById("exportPlan")
    .addEventListener("click", exportWeek);
  document
    .getElementById("addRecipeForm")
    .addEventListener("submit", handleRecipeSubmit);

  suggestionSheet.addEventListener("click", (event) => {
    if (event.target === suggestionSheet) {
      closeSuggestionSheet();
    }
  });

  suggestionSheet
    .querySelector('[data-action="close-sheet"]')
    .addEventListener("click", closeSuggestionSheet);

  suggestionSearch.addEventListener("input", (event) => {
    renderSuggestionGrid(event.target.value);
  });

  suggestionSheet
    .querySelector('[data-action="random-suggestion"]')
    .addEventListener("click", () => {
      const suggestions = getAllSuggestions();
      if (suggestions.length === 0) return;
      const random =
        suggestions[Math.floor(Math.random() * suggestions.length)].label;
      applySuggestion(random);
    });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSuggestionSheet();
    }
  });
}

function init() {
  renderPlanner();
  renderRecipeTags();
  registerEvents();
}

init();
