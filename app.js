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

const defaultSuggestions = [
  { label: "Salade César au poulet", category: "Rapide" },
  { label: "Quiche aux poireaux", category: "Végétarien" },
  { label: "Pâtes au pesto maison", category: "Végétarien" },
  { label: "Curry de pois chiches", category: "Végétarien" },
  { label: "Saumon teriyaki et riz", category: "Poisson" },
  { label: "Pad thaï aux crevettes", category: "Poisson" },
  { label: "Wok de légumes croquants", category: "Rapide" },
  { label: "Poulet rôti et légumes racines", category: "Classique" },
  { label: "Soupe thaï coco", category: "Réconfort" },
  { label: "Buddha bowl quinoa & tofu", category: "Végétarien" },
  { label: "Tacos au bœuf effiloché", category: "Convivial" },
  { label: "Lasagnes aux légumes", category: "Famille" },
  { label: "Boulettes suédoises et purée", category: "Famille" },
  { label: "Poke bowl au thon", category: "Poisson" },
  { label: "Risotto aux champignons", category: "Végétarien" },
  { label: "Omelette aux herbes fraîches", category: "Rapide" },
  { label: "Bœuf bourguignon express", category: "Réconfort" },
  { label: "Chili sin carne", category: "Végétarien" },
  { label: "Galettes de sarrasin complètes", category: "Classique" },
  { label: "Poisson en papillote citronné", category: "Poisson" },
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

    plannerEl.appendChild(dayFragment);
  });
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
}

function handleMealInput(event) {
  const { day, slot } = event.target.dataset;
  planState[day][slot] = event.target.value;
  updateMealCardState(event.target.closest(".meal-card"), event.target.value);
  savePlan();
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
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-button";
    button.innerHTML = `${suggestion.label} <span>${suggestion.category || "Perso"}</span>`;
    button.addEventListener("click", () => applySuggestion(suggestion.label));
    suggestionGrid.appendChild(button);
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

  registerDragAndDrop();
}

function init() {
  applyIOSBodyClasses();
  renderPlanner();
  renderRecipeTags();
  registerEvents();
}

init();
