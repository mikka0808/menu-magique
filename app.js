import { RECIPE_DATA } from "./recipe-data.js";

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

const LONG_PRESS_DELAY = 180;
const MOVE_CANCEL_DISTANCE = 8;

const STORAGE_KEYS = {
  plan: "menu-magique-plan",
  recipes: "menu-magique-recipes",
};

const CUSTOM_CATEGORY = "Perso";
const CATEGORY_ALL_FILTER = "Tous";

const catalogSuggestions = RECIPE_DATA.map((recipe) => {
  const highlights = recipe.ingredients
    .slice(0, 3)
    .map((ingredient) => ingredient.item);
  const searchTokens = [
    recipe.title,
    recipe.category,
    ...recipe.ingredients.map((ingredient) => ingredient.item),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    id: recipe.id,
    label: recipe.title,
    category: recipe.category || "Facile & rapide",
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    calories: recipe.calories,
    highlights,
    searchTokens,
  };
}).sort((a, b) => a.label.localeCompare(b.label, "fr"));

const catalogLookup = new Map(
  catalogSuggestions.map((suggestion) => [suggestion.label, suggestion])
);

const plannerEl = document.getElementById("planner");
const suggestionSheet = document.getElementById("suggestionSheet");
const suggestionGrid = document.getElementById("suggestionGrid");
const suggestionSearch = document.getElementById("suggestionSearch");
const suggestionFilters = document.getElementById("suggestionFilters");
const recipeCategorySelect = document.getElementById("recipeCategory");
const toastEl = document.getElementById("toast");
const recipeTags = document.getElementById("recipeTags");

let planState = loadPlan();
let customRecipes = loadRecipes();
let activeSlot = null;
let activeSuggestionCategory = CATEGORY_ALL_FILTER;
let dragState = null;
let dragTimer = null;

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
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => item && typeof item.label === "string")
      .map((item) => ({
        label: item.label,
        category:
          typeof item.category === "string" && item.category.trim()
            ? item.category.trim()
            : CUSTOM_CATEGORY,
      }));
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
  const merged = catalogSuggestions.map((suggestion) => ({ ...suggestion }));
  customRecipes.forEach((recipe) => {
    if (!merged.some((item) => item.label === recipe.label)) {
      const category = recipe.category || CUSTOM_CATEGORY;
      merged.push({
        id: null,
        label: recipe.label,
        category,
        prepTime: null,
        cookTime: null,
        calories: null,
        highlights: [],
        searchTokens: `${recipe.label} ${category}`.toLowerCase(),
        isCustom: true,
      });
    }
  });

  return merged.sort((a, b) => a.label.localeCompare(b.label, "fr"));
}

function getAvailableCategories() {
  const categories = new Set();
  catalogSuggestions.forEach((item) => {
    if (item.category) {
      categories.add(item.category);
    }
  });
  customRecipes.forEach((item) => {
    if (item.category) {
      categories.add(item.category);
    }
  });
  categories.add(CUSTOM_CATEGORY);

  return Array.from(categories).sort((a, b) => a.localeCompare(b, "fr"));
}

function renderSuggestionFilters() {
  if (!suggestionFilters) return;
  const categories = [CATEGORY_ALL_FILTER, ...getAvailableCategories()];
  if (!categories.includes(activeSuggestionCategory)) {
    activeSuggestionCategory = CATEGORY_ALL_FILTER;
  }
  suggestionFilters.innerHTML = "";
  suggestionFilters.scrollTo({ left: 0, behavior: "auto" });

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-filter btn-touch";
    button.dataset.categoryFilter = category;
    button.textContent = category;
    button.setAttribute(
      "aria-selected",
      category === activeSuggestionCategory ? "true" : "false"
    );
    button.setAttribute("role", "tab");
    button.setAttribute(
      "tabindex",
      category === activeSuggestionCategory ? "0" : "-1"
    );
    suggestionFilters.appendChild(button);
  });
}

function updateActiveSuggestionFilter() {
  if (!suggestionFilters) return;
  suggestionFilters
    .querySelectorAll("[data-category-filter]")
    .forEach((button) => {
      const isActive =
        button.dataset.categoryFilter === activeSuggestionCategory;
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });
}

function populateCategorySelect() {
  if (!recipeCategorySelect) return;
  const categories = getAvailableCategories();
  const previousValue = recipeCategorySelect.value;
  recipeCategorySelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Choisir un type (facultatif)";
  recipeCategorySelect.appendChild(placeholder);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    recipeCategorySelect.appendChild(option);
  });

  if (categories.includes(previousValue)) {
    recipeCategorySelect.value = previousValue;
  }
}

function renderPlanner() {
  const dayTemplate = document.getElementById("day-template");
  const mealTemplate = document.getElementById("meal-template");
  plannerEl.innerHTML = "";

  const overviewContainer = document.createElement("section");
  overviewContainer.className = "week-overview";
  const overviewTrack = document.createElement("div");
  overviewTrack.className = "week-overview-track";
  overviewContainer.appendChild(overviewTrack);
  plannerEl.appendChild(overviewContainer);

  days.forEach((day) => {
    const summaryCard = document.createElement("button");
    summaryCard.type = "button";
    summaryCard.className = "overview-card btn-touch";
    summaryCard.dataset.daySummary = day;

    const dayLabel = document.createElement("span");
    dayLabel.className = "overview-day";
    dayLabel.textContent = day.slice(0, 3).toUpperCase();
    summaryCard.appendChild(dayLabel);

    const summaryMeals = document.createElement("div");
    summaryMeals.className = "overview-meals";
    summaryCard.appendChild(summaryMeals);

    mealSlots.forEach((slot) => {
      const summaryRow = document.createElement("p");
      summaryRow.className = "overview-meal";

      const label = document.createElement("span");
      label.className = "overview-meal-label";
      label.textContent = slot.label;
      summaryRow.appendChild(label);

      const value = document.createElement("span");
      value.className = "overview-meal-value";
      value.dataset.summarySlot = slot.key;
      value.textContent = formatOverviewValue(planState[day][slot.key]);
      summaryRow.appendChild(value);

      summaryMeals.appendChild(summaryRow);
    });

    const dayFragment = dayTemplate.content.cloneNode(true);
    const dayCard = dayFragment.querySelector(".day-card");
    const dayNameEl = dayFragment.querySelector('[data-slot="day-name"]');
    const mealsContainer = dayFragment.querySelector(".meals");
    dayNameEl.textContent = day;

    const dayId = `day-${day.toLowerCase().replace(/\s+/g, "-")}`;
    dayCard.id = dayId;
    summaryCard.addEventListener("click", () => focusDayCard(dayId));

    mealSlots.forEach((slot) => {
      const mealFragment = mealTemplate.content.cloneNode(true);
      const mealName = mealFragment.querySelector('[data-slot="meal-name"]');
      const mealCard = mealFragment.querySelector(".meal-card");
      const textarea = mealFragment.querySelector('[data-role="meal-input"]');
      const suggestionButton = mealFragment.querySelector(
        '[data-action="open-suggestions"]'
      );
      const clearButton = mealFragment.querySelector(
        '[data-action="clear-meal"]'
      );
      const dragHandle = mealFragment.querySelector('[data-role="drag-handle"]');

      mealName.textContent = `${slot.icon} ${slot.label}`;
      mealCard.dataset.day = day;
      mealCard.dataset.slot = slot.key;
      textarea.value = planState[day][slot.key];
      textarea.dataset.day = day;
      textarea.dataset.slot = slot.key;

      textarea.addEventListener("input", handleMealInput, { passive: true });
      suggestionButton.addEventListener("click", () =>
        openSuggestionSheet(day, slot.key)
      );
      clearButton.addEventListener("click", () => clearMeal(day, slot.key));
      updateMealCardState(mealCard, planState[day][slot.key]);
      if (dragHandle) {
        dragHandle.disabled = !planState[day][slot.key].trim();
      }

      mealsContainer.appendChild(mealFragment);
    });

    const clearDayButton = dayFragment.querySelector(
      '[data-action="clear-day"]'
    );
    clearDayButton.addEventListener("click", () => clearDay(day));

    overviewTrack.appendChild(summaryCard);
    refreshOverviewForDay(day);

    plannerEl.appendChild(dayFragment);
  });
}

function focusDayCard(dayId) {
  const target = document.getElementById(dayId);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  target.classList.add("day-card--highlighted");
  window.setTimeout(() => {
    target.classList.remove("day-card--highlighted");
  }, 900);
}

function formatOverviewValue(value) {
  const normalized = (value || "").trim();
  return normalized.length > 0 ? normalized : "Ajouter";
}

function refreshOverviewForDay(day) {
  const card = plannerEl.querySelector(
    `.overview-card[data-day-summary="${day}"]`
  );
  if (!card) return;
  mealSlots.forEach((slot) => {
    const valueEl = card.querySelector(
      `[data-summary-slot="${slot.key}"]`
    );
    if (!valueEl) return;
    valueEl.textContent = formatOverviewValue(planState[day][slot.key]);
  });
  const hasContent = mealSlots.some(
    (slot) => (planState[day][slot.key] || "").trim().length > 0
  );
  card.classList.toggle("is-empty", !hasContent);
  const ariaLabel = `${day} – Midi: ${formatOverviewValue(
    planState[day].lunch
  )}, Soir: ${formatOverviewValue(planState[day].dinner)}`;
  card.setAttribute("aria-label", ariaLabel);
  card.title = `${day} – Midi: ${formatOverviewValue(
    planState[day].lunch
  )} • Soir: ${formatOverviewValue(planState[day].dinner)}`;
}

function getMealTextarea(day, slot) {
  return plannerEl.querySelector(
    `textarea[data-day="${day}"][data-slot="${slot}"]`
  );
}

function updateMealCardState(card, value) {
  if (!card) return;
  const normalized = (value || "").trim();
  card.classList.toggle("is-empty", normalized.length === 0);
  const handle = card.querySelector('[data-role="drag-handle"]');
  if (handle) {
    handle.disabled = normalized.length === 0;
  }
}

function syncMealCard(day, slot, { focus = false } = {}) {
  const textarea = getMealTextarea(day, slot);
  if (!textarea) return;
  textarea.value = planState[day][slot];
  updateMealCardState(textarea.closest(".meal-card"), planState[day][slot]);
  if (focus) {
    textarea.focus();
  }
  refreshOverviewForDay(day);
}

function handleMealInput(event) {
  const { day, slot } = event.target.dataset;
  planState[day][slot] = event.target.value;
  updateMealCardState(event.target.closest(".meal-card"), event.target.value);
  savePlan();
  refreshOverviewForDay(day);
}

function clearMeal(day, slot) {
  planState[day][slot] = "";
  syncMealCard(day, slot, { focus: true });
  savePlan();
}

function clearDay(day) {
  mealSlots.forEach((slot) => {
    planState[day][slot.key] = "";
    syncMealCard(day, slot.key);
  });
  savePlan();
  showToast(`La journée ${day} a été réinitialisée.`);
}

function openSuggestionSheet(day, slotKey) {
  activeSlot = { day, slotKey };
  suggestionSheet.classList.remove("hidden");
  suggestionSheet.setAttribute("aria-hidden", "false");
  suggestionSearch.value = "";
  activeSuggestionCategory = CATEGORY_ALL_FILTER;
  renderSuggestionFilters();
  updateActiveSuggestionFilter();
  populateCategorySelect();
  renderSuggestionGrid();
  suggestionSearch.focus({ preventScroll: false });
}

function closeSuggestionSheet() {
  activeSlot = null;
  suggestionSheet.classList.add("hidden");
  suggestionSheet.setAttribute("aria-hidden", "true");
}

function renderSuggestionGrid(filterText = "") {
  if (!suggestionGrid) return;
  const suggestions = filterSuggestions(filterText);

  suggestionGrid.innerHTML = "";

  if (suggestions.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Aucune suggestion trouvée.";
    empty.className = "empty-state";
    suggestionGrid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  suggestions.forEach((suggestion) => {
    const card = document.createElement("article");
    card.className = "suggestion-card";
    card.dataset.category = suggestion.category || CUSTOM_CATEGORY;
    if (suggestion.id) {
      card.dataset.recipeId = suggestion.id;
    }

    const header = document.createElement("div");
    header.className = "suggestion-card-header";

    const title = document.createElement("h3");
    title.className = "suggestion-card-title";
    title.textContent = suggestion.label;

    const badge = document.createElement("span");
    badge.className = "suggestion-badge";
    badge.textContent = suggestion.category || CUSTOM_CATEGORY;

    header.appendChild(title);
    header.appendChild(badge);
    card.appendChild(header);

    const metaItems = [];
    if (Number.isFinite(suggestion.prepTime)) {
      metaItems.push({ icon: "🕑", label: "Préparation", value: `${suggestion.prepTime} min` });
    }
    if (Number.isFinite(suggestion.cookTime)) {
      metaItems.push({ icon: "🍳", label: "Cuisson", value: `${suggestion.cookTime} min` });
    }
    if (Number.isFinite(suggestion.calories)) {
      metaItems.push({ icon: "🔥", label: "Énergie", value: `${suggestion.calories} kcal` });
    }

    if (metaItems.length) {
      const metaList = document.createElement("ul");
      metaList.className = "suggestion-card-meta";
      metaItems.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<span aria-hidden="true">${item.icon}</span> <strong>${item.value}</strong>`;
        li.setAttribute("aria-label", `${item.label} : ${item.value}`);
        metaList.appendChild(li);
      });
      card.appendChild(metaList);
    }

    if (suggestion.highlights?.length) {
      const highlightContainer = document.createElement("div");
      highlightContainer.className = "suggestion-card-highlights";
      suggestion.highlights.slice(0, 3).forEach((highlight) => {
        const chip = document.createElement("span");
        chip.className = "suggestion-highlight";
        chip.textContent = highlight;
        highlightContainer.appendChild(chip);
      });
      card.appendChild(highlightContainer);
    }

    const actions = document.createElement("div");
    actions.className = "suggestion-card-actions";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "suggestion-card-apply btn-touch";
    addButton.textContent = "Ajouter au planning";
    addButton.addEventListener("click", () => applySuggestion(suggestion.label));
    actions.appendChild(addButton);

    if (suggestion.id) {
      const detailsLink = document.createElement("a");
      detailsLink.href = `recettes.html#${suggestion.id}`;
      detailsLink.className = "suggestion-card-link";
      detailsLink.textContent = "Voir la fiche";
      actions.appendChild(detailsLink);
    } else {
      const note = document.createElement("span");
      note.className = "suggestion-card-note";
      note.textContent = "Idée personnalisée";
      actions.appendChild(note);
    }

    card.appendChild(actions);
    fragment.appendChild(card);
  });

  suggestionGrid.appendChild(fragment);
}

function handleSuggestionFilterClick(event) {
  const button = event.target.closest("[data-category-filter]");
  if (!button) return;
  const { categoryFilter } = button.dataset;
  if (!categoryFilter || categoryFilter === activeSuggestionCategory) {
    return;
  }
  activeSuggestionCategory = categoryFilter;
  updateActiveSuggestionFilter();
  button.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  renderSuggestionGrid(suggestionSearch.value);
}

function filterSuggestions(filterText = "") {
  const normalizedFilter = filterText.trim().toLowerCase();
  return getAllSuggestions().filter(({ category, searchTokens }) => {
    const matchesText =
      normalizedFilter.length === 0 ||
      (searchTokens || "").includes(normalizedFilter);
    const normalizedCategory = category || CUSTOM_CATEGORY;
    const matchesCategory =
      activeSuggestionCategory === CATEGORY_ALL_FILTER ||
      normalizedCategory === activeSuggestionCategory;
    return matchesText && matchesCategory;
  });
}

function applySuggestion(value) {
  if (!activeSlot) return;
  const { day, slotKey } = activeSlot;
  planState[day][slotKey] = value;
  syncMealCard(day, slotKey);
  savePlan();
  closeSuggestionSheet();
}

function generateWeek() {
  const suggestions = getAllSuggestions();
  const randomItem = () =>
    suggestions[Math.floor(Math.random() * suggestions.length)]?.label || "";

  days.forEach((day) => {
    mealSlots.forEach((slot) => {
      planState[day][slot.key] = randomItem();
      syncMealCard(day, slot.key);
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
  const categoryField = event.target.elements.category;
  const value = input.value.trim();
  if (!value) return;

  if (customRecipes.some((recipe) => recipe.label === value)) {
    showToast("Cette idée est déjà enregistrée.");
    input.value = "";
    return;
  }

  const selectedCategory =
    typeof categoryField?.value === "string"
      ? categoryField.value.trim()
      : "";

  const category =
    selectedCategory ||
    catalogLookup.get(value)?.category ||
    CUSTOM_CATEGORY;

  customRecipes.push({ label: value, category });
  saveRecipes();
  renderRecipeTags();
  populateCategorySelect();
  if (!suggestionSheet.classList.contains("hidden")) {
    renderSuggestionFilters();
    updateActiveSuggestionFilter();
    renderSuggestionGrid(suggestionSearch.value);
  }
  showToast("Idée ajoutée à la bibliothèque !");
  input.value = "";
  if (categoryField) {
    categoryField.value = "";
  }
}

function renderRecipeTags() {
  recipeTags.innerHTML = "";
  const suggestions = getAllSuggestions();
  if (!suggestions.length) {
    return;
  }

  const catalogOnly = suggestions.filter((item) => item.id);
  const customOnly = suggestions.filter((item) => item.isCustom);

  const selected = [];
  const maxCatalog = Math.min(24, catalogOnly.length);
  const maxCustom = Math.min(6, customOnly.length);

  const pickRandomItems = (pool, count) => {
    if (!count) return [];
    const result = [];
    const used = new Set();
    while (result.length < count && used.size < pool.length) {
      const index = Math.floor(Math.random() * pool.length);
      if (used.has(index)) {
        continue;
      }
      used.add(index);
      result.push(pool[index]);
    }
    return result;
  };

  selected.push(...pickRandomItems(catalogOnly, maxCatalog));
  selected.push(...pickRandomItems(customOnly, maxCustom));

  selected.forEach((suggestion) => {
    const elementTag = suggestion.id ? "a" : "span";
    const tag = document.createElement(elementTag);
    tag.className = "recipe-tag";
    if (suggestion.id) {
      tag.classList.add("recipe-tag--link");
      tag.href = `recettes.html#${suggestion.id}`;
    }
    tag.textContent = suggestion.label;
    if (suggestion.highlights?.length) {
      tag.title = `Ingrédients clés : ${suggestion.highlights
        .slice(0, 3)
        .join(", ")}`;
    }
    recipeTags.appendChild(tag);
  });
}

function registerDragAndDrop() {
  plannerEl.addEventListener("pointerdown", handlePointerDown);
  window.addEventListener("pointermove", handlePointerMove, { passive: false });
  window.addEventListener("pointerup", handlePointerUp, { passive: true });
  window.addEventListener("pointercancel", handlePointerCancel, {
    passive: true,
  });
}

function handlePointerDown(event) {
  const handle = event.target.closest('[data-role="drag-handle"]');
  if (!handle) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;

  const card = handle.closest(".meal-card");
  if (!card) return;

  const { day, slot } = card.dataset;
  if (!day || !slot) return;

  dragState = {
    pointerId: event.pointerId,
    card,
    handle,
    sourceDay: day,
    sourceSlot: slot,
    startX: event.clientX,
    startY: event.clientY,
    currentX: event.clientX,
    currentY: event.clientY,
    offsetX: 0,
    offsetY: 0,
    ghost: null,
    targetCard: null,
    active: false,
  };

  dragTimer = window.setTimeout(() => activateDrag(), LONG_PRESS_DELAY);
}

function handlePointerMove(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  dragState.currentX = event.clientX;
  dragState.currentY = event.clientY;

  if (!dragState.active) {
    const deltaX = Math.abs(event.clientX - dragState.startX);
    const deltaY = Math.abs(event.clientY - dragState.startY);
    if (deltaX > MOVE_CANCEL_DISTANCE || deltaY > MOVE_CANCEL_DISTANCE) {
      cleanupDrag();
    }
    return;
  }

  event.preventDefault();
  moveGhost(event.clientX, event.clientY);
  updateDropTarget(event.clientX, event.clientY);
}

function handlePointerUp(event) {
  if (!dragState || event.pointerId !== dragState.pointerId) return;
  if (dragState.active) {
    finalizeDrag();
  }
  cleanupDrag();
}

function handlePointerCancel(event) {
  if (!dragState) return;
  if (event.pointerId && event.pointerId !== dragState.pointerId) return;
  cleanupDrag();
}

function activateDrag() {
  if (!dragState) return;
  const { sourceDay, sourceSlot, card } = dragState;
  const value = (planState[sourceDay][sourceSlot] || "").trim();
  if (!value) {
    cleanupDrag();
    return;
  }

  const rect = card.getBoundingClientRect();
  const pointerX = dragState.currentX ?? dragState.startX;
  const pointerY = dragState.currentY ?? dragState.startY;
  dragState.offsetX = pointerX - rect.left;
  dragState.offsetY = pointerY - rect.top;

  const ghost = createGhostElement(card, value);
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  ghost.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0)`;
  document.body.appendChild(ghost);

  card.classList.add("is-dragging");
  document.body.classList.add("is-dragging");

  dragState.ghost = ghost;
  dragState.active = true;

  moveGhost(pointerX, pointerY);
  updateDropTarget(pointerX, pointerY);
}

function moveGhost(clientX, clientY) {
  if (!dragState || !dragState.ghost) return;
  const x = clientX - dragState.offsetX;
  const y = clientY - dragState.offsetY;
  dragState.ghost.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function updateDropTarget(clientX, clientY) {
  if (!dragState) return;
  const element = document.elementFromPoint(clientX, clientY);
  const targetCard = element?.closest?.(".meal-card") || null;
  if (dragState.targetCard === targetCard) {
    return;
  }

  if (dragState.targetCard) {
    dragState.targetCard.classList.remove("drag-active");
  }

  dragState.targetCard = targetCard;

  if (targetCard) {
    targetCard.classList.add("drag-active");
  }
}

function finalizeDrag() {
  if (!dragState) return;
  const { sourceDay, sourceSlot, targetCard } = dragState;
  if (!targetCard) return;

  const { day: targetDay, slot: targetSlot } = targetCard.dataset;
  if (!targetDay || !targetSlot) return;
  if (sourceDay === targetDay && sourceSlot === targetSlot) return;

  const sourceValue = planState[sourceDay][sourceSlot];
  const targetValue = planState[targetDay][targetSlot];

  planState[sourceDay][sourceSlot] = targetValue;
  planState[targetDay][targetSlot] = sourceValue;

  syncMealCard(sourceDay, sourceSlot);
  syncMealCard(targetDay, targetSlot);
  savePlan();
  showToast("Repas déplacés.");
}

function cleanupDrag() {
  if (dragTimer) {
    clearTimeout(dragTimer);
    dragTimer = null;
  }

  if (!dragState) return;

  if (dragState.card) {
    dragState.card.classList.remove("is-dragging");
  }
  if (dragState.targetCard) {
    dragState.targetCard.classList.remove("drag-active");
  }
  if (dragState.ghost) {
    dragState.ghost.remove();
  }

  document.body.classList.remove("is-dragging");
  dragState = null;
}

function createGhostElement(card, value) {
  const ghost = document.createElement("div");
  ghost.className = "drag-ghost";
  const title = document.createElement("strong");
  title.textContent = card.querySelector('[data-slot="meal-name"]').textContent;
  const content = document.createElement("span");
  content.textContent = value;
  ghost.appendChild(title);
  ghost.appendChild(content);
  return ghost;
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
      const suggestions = filterSuggestions(suggestionSearch.value);
      if (suggestions.length === 0) return;
      const random =
        suggestions[Math.floor(Math.random() * suggestions.length)].label;
      applySuggestion(random);
    });

  if (suggestionFilters) {
    suggestionFilters.addEventListener("click", handleSuggestionFilterClick);
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSuggestionSheet();
    }
  });

  registerDragAndDrop();
}

function init() {
  applyIOSBodyClasses();
  renderPlanner();
  renderRecipeTags();
  populateCategorySelect();
  registerEvents();
}

init();
