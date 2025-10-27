const SHOPPING_LIST_KEY = "menu-magique-shopping-list";

const RECIPES = [
  {
    id: "salade-cesar",
    title: "Salade César au poulet",
    prepTime: 15,
    cookTime: 10,
    calories: 520,
    ingredients: [
      { quantity: "2", item: "filets de poulet", note: "grillés et tranchés" },
      { quantity: "1", item: "cœur de laitue romaine" },
      { quantity: "40 g", item: "de copeaux de parmesan" },
      { quantity: "8", item: "croûtons croustillants" },
      { quantity: "3 c. à s.", item: "de sauce César" },
      { quantity: "1", item: "citron", note: "pour le zeste" },
    ],
    steps: [
      "Mélangez la laitue lavée avec la sauce César dans un grand saladier.",
      "Ajoutez le poulet tiède, les croûtons et le parmesan.",
      "Zestez le citron et servez immédiatement.",
    ],
  },
  {
    id: "curry-pois-chiches",
    title: "Curry de pois chiches",
    prepTime: 10,
    cookTime: 25,
    calories: 460,
    ingredients: [
      { quantity: "1", item: "oignon", note: "émincé" },
      { quantity: "2 gousses", item: "d'ail", note: "hachées" },
      { quantity: "1 c. à s.", item: "de pâte de curry rouge" },
      { quantity: "400 g", item: "de pois chiches", note: "cuits et rincés" },
      { quantity: "400 ml", item: "de lait de coco" },
      { quantity: "2", item: "carottes", note: "en rondelles" },
      { quantity: "1 poignée", item: "d'épinards frais" },
      { quantity: "1", item: "citron vert", note: "pour le jus" },
    ],
    steps: [
      "Faites revenir l'oignon et l'ail dans un filet d'huile jusqu'à légère coloration.",
      "Ajoutez la pâte de curry et les carottes, puis versez le lait de coco.",
      "Incorporez les pois chiches, laissez mijoter 15 minutes et terminez avec les épinards et le jus de citron vert.",
    ],
  },
  {
    id: "saumon-teriyaki",
    title: "Saumon teriyaki et riz",
    prepTime: 10,
    cookTime: 15,
    calories: 540,
    ingredients: [
      { quantity: "2", item: "filets de saumon" },
      { quantity: "4 c. à s.", item: "de sauce teriyaki" },
      { quantity: "200 g", item: "de riz jasmin" },
      { quantity: "1", item: "brocoli", note: "en fleurettes" },
      { quantity: "1 c. à s.", item: "de graines de sésame" },
      { quantity: "2", item: "oignons nouveaux", note: "émincés" },
    ],
    steps: [
      "Faites mariner le saumon dans la sauce teriyaki pendant que le riz cuit.",
      "Saisissez le saumon 3 minutes de chaque côté et nappez avec la marinade.",
      "Servez avec le riz, le brocoli vapeur et parsemez de graines de sésame et d'oignons nouveaux.",
    ],
  },
  {
    id: "lasagnes-legumes",
    title: "Lasagnes aux légumes",
    prepTime: 25,
    cookTime: 35,
    calories: 610,
    ingredients: [
      { quantity: "8", item: "feuilles de lasagnes" },
      { quantity: "1", item: "courgette", note: "en petits dés" },
      { quantity: "1", item: "poivron rouge", note: "en dés" },
      { quantity: "200 g", item: "de champignons", note: "émincés" },
      { quantity: "500 ml", item: "de sauce tomate maison" },
      { quantity: "250 g", item: "de ricotta" },
      { quantity: "80 g", item: "de mozzarella râpée" },
      { quantity: "1 poignée", item: "de basilic frais" },
    ],
    steps: [
      "Faites revenir les légumes 5 minutes dans une sauteuse avec un filet d'huile.",
      "Montez les lasagnes en alternant feuilles, légumes et ricotta.",
      "Terminez par la sauce tomate, la mozzarella et enfournez 30 à 35 minutes à 190 °C.",
    ],
  },
  {
    id: "poke-bowl",
    title: "Poke bowl au thon",
    prepTime: 20,
    cookTime: 0,
    calories: 480,
    ingredients: [
      { quantity: "200 g", item: "de thon cru", note: "qualité sashimi" },
      { quantity: "250 g", item: "de riz à sushi", note: "cuit et refroidi" },
      { quantity: "1", item: "avocat", note: "en dés" },
      { quantity: "1", item: "mangue", note: "en cubes" },
      { quantity: "2 c. à s.", item: "de sauce soja" },
      { quantity: "1 c. à s.", item: "d'huile de sésame" },
      { quantity: "1", item: "citron vert", note: "pour le jus" },
      { quantity: "2 c. à s.", item: "d'oignons frits" },
    ],
    steps: [
      "Assaisonnez le thon avec la sauce soja, l'huile de sésame et le jus de citron vert.",
      "Disposez le riz dans des bols et garnissez avec le thon, l'avocat et la mangue.",
      "Parsemez d'oignons frits juste avant de servir.",
    ],
  },
  {
    id: "buddha-bowl",
    title: "Buddha bowl quinoa & tofu",
    prepTime: 20,
    cookTime: 20,
    calories: 510,
    ingredients: [
      { quantity: "160 g", item: "de quinoa", note: "rincé" },
      { quantity: "200 g", item: "de tofu ferme", note: "coupé en dés" },
      { quantity: "1", item: "patate douce", note: "en cubes" },
      { quantity: "1", item: "betterave", note: "râpée" },
      { quantity: "1", item: "carotte", note: "en rubans" },
      { quantity: "2 c. à s.", item: "de sauce soja" },
      { quantity: "1 c. à s.", item: "d'huile de sésame grillé" },
      { quantity: "1", item: "citron", note: "pour le jus" },
    ],
    steps: [
      "Cuisez le quinoa dans deux fois son volume d'eau jusqu'à absorption.",
      "Rôtissez la patate douce 20 minutes à 200 °C avec un filet d'huile.",
      "Poêlez le tofu avec la sauce soja, assemblez le bol et nappez avec une vinaigrette citron-sésame.",
    ],
  },
];

const recipeListEl = document.getElementById("recipeList");
const shoppingListEl = document.getElementById("shoppingList");
const shoppingListEmptyEl = document.getElementById("shoppingListEmpty");
const clearShoppingListButton = document.getElementById("clearShoppingList");
const toastEl = document.getElementById("recipeToast");

let shoppingList = loadShoppingList();
let toastTimer = null;

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

function renderRecipes() {
  if (!recipeListEl) {
    return;
  }

  recipeListEl.querySelectorAll(".recipe-card").forEach((card) => card.remove());

  RECIPES.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const title = document.createElement("h2");
    title.textContent = recipe.title;
    card.appendChild(title);

    const meta = document.createElement("div");
    meta.className = "recipe-meta";
    meta.innerHTML = `
      <span><span aria-hidden="true">⏱️</span> Préparation : <strong>${recipe.prepTime} min</strong></span>
      <span><span aria-hidden="true">🍳</span> Cuisson : <strong>${recipe.cookTime} min</strong></span>
      <span><span aria-hidden="true">🔥</span> ${recipe.calories} kcal</span>
    `;
    card.appendChild(meta);

    const sections = document.createElement("div");
    sections.className = "recipe-sections";

    const ingredientsSection = document.createElement("div");
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

    const stepsSection = document.createElement("div");
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
    addButton.className = "primary-button btn-touch";
    addButton.textContent = "Ajouter les ingrédients à la liste";
    addButton.addEventListener("click", () => handleAddIngredients(recipe));
    card.appendChild(addButton);

    recipeListEl.appendChild(card);
  });
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
