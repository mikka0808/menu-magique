import { getRecipeSuggestions, filterRecipesByQuery } from "./recipe-utils.js";

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
};

const DEFAULT_CATEGORY = "Autres";
const CATEGORY_ALL_FILTER = "Tous";

const catalogSuggestions = getRecipeSuggestions();

const plannerEl = document.getElementById("planner");
const suggestionSheet = document.getElementById("suggestionSheet");
const suggestionGrid = document.getElementById("suggestionGrid");
const suggestionSearch = document.getElementById("suggestionSearch");
const suggestionFilters = document.getElementById("suggestionFilters");
const toastEl = document.getElementById("toast");

let planState = loadPlan();
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

function getAllSuggestions() {
  return catalogSuggestions.map((suggestion) => ({ ...suggestion }));
}

function getAvailableCategories() {
  const categories = new Set();
  catalogSuggestions.forEach((item) => {
    if (item.category) {
      categories.add(item.category);
    }
  });

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
    card.dataset.category = suggestion.category || DEFAULT_CATEGORY;
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
    badge.textContent = suggestion.category || DEFAULT_CATEGORY;

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
  const matchedRecipeIds =
    normalizedFilter.length === 0
      ? null
      : new Set(filterRecipesByQuery(filterText).map((recipe) => recipe.id));

  return getAllSuggestions().filter(({ category, searchTokens, id }) => {
    let matchesText = true;
    if (normalizedFilter.length > 0) {
      if (id && matchedRecipeIds) {
        matchesText = matchedRecipeIds.has(id);
      } else {
        matchesText = (searchTokens || "").includes(normalizedFilter);
      }
    }

    if (!matchesText) {
      return false;
    }

    const normalizedCategory = category || DEFAULT_CATEGORY;
    const matchesCategory =
      activeSuggestionCategory === CATEGORY_ALL_FILTER ||
      normalizedCategory === activeSuggestionCategory;
    return matchesCategory;
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
  registerEvents();
}

init();
