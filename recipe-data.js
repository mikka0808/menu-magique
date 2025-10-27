const BASE_RECIPES = [
  {
    id: "salade-cesar",
    title: "Salade César au poulet",
    category: "Facile & rapide",
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
    category: "Végétarien",
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
    category: "Poisson",
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
    category: "Familial",
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
    category: "Frais",
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
    category: "Végétarien",
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
  {
    id: "pates-pesto",
    title: "Pâtes au pesto maison",
    category: "Rapide",
    prepTime: 12,
    cookTime: 10,
    calories: 480,
    ingredients: [
      { quantity: "320 g", item: "de linguine" },
      { quantity: "40 g", item: "de basilic frais" },
      { quantity: "30 g", item: "de pignons de pin" },
      { quantity: "60 g", item: "de parmesan râpé" },
      { quantity: "1 gousse", item: "d'ail" },
      { quantity: "6 c. à s.", item: "d'huile d'olive" },
      { quantity: "200 g", item: "de tomates cerises", note: "coupées en deux" },
    ],
    steps: [
      "Mixez le basilic, les pignons, l'ail et le parmesan en ajoutant l'huile pour obtenir un pesto onctueux.",
      "Cuisez les linguine al dente et réservez un peu d'eau de cuisson.",
      "Mélangez les pâtes avec le pesto et détendez avec l'eau de cuisson si nécessaire, ajoutez les tomates juste avant de servir.",
    ],
  },
  {
    id: "tacos-vegetariens",
    title: "Tacos végétariens colorés",
    category: "Convivial",
    prepTime: 18,
    cookTime: 12,
    calories: 430,
    ingredients: [
      { quantity: "6", item: "tortillas de maïs" },
      { quantity: "400 g", item: "de haricots noirs", note: "rincés" },
      { quantity: "1", item: "oignon rouge", note: "émincé" },
      { quantity: "1", item: "poivron jaune", note: "en lanières" },
      { quantity: "1", item: "avocat", note: "en dés" },
      { quantity: "100 g", item: "de feta émiettée" },
      { quantity: "1", item: "citron vert", note: "pour le jus" },
    ],
    steps: [
      "Faites revenir l'oignon et le poivron avec un filet d'huile.",
      "Ajoutez les haricots noirs, assaisonnez et réchauffez 3 minutes.",
      "Garnissez les tortillas de légumes, d'avocat et de feta puis arrosez de jus de citron vert.",
    ],
  },
  {
    id: "risotto-champignons",
    title: "Risotto crémeux aux champignons",
    category: "Réconfort",
    prepTime: 15,
    cookTime: 25,
    calories: 560,
    ingredients: [
      { quantity: "300 g", item: "de riz arborio" },
      { quantity: "400 g", item: "de champignons de Paris", note: "émincés" },
      { quantity: "1", item: "échalote", note: "ciselée" },
      { quantity: "100 ml", item: "de vin blanc sec" },
      { quantity: "900 ml", item: "de bouillon de légumes" },
      { quantity: "60 g", item: "de parmesan râpé" },
      { quantity: "20 g", item: "de beurre" },
    ],
    steps: [
      "Faites revenir l'échalote et les champignons dans le beurre.",
      "Ajoutez le riz, nacrez-le puis versez le vin blanc et laissez évaporer.",
      "Versez le bouillon petit à petit jusqu'à cuisson du riz, terminez avec le parmesan.",
    ],
  },
  {
    id: "soupe-lentilles-corail",
    title: "Soupe de lentilles corail",
    category: "Réconfort",
    prepTime: 10,
    cookTime: 20,
    calories: 320,
    ingredients: [
      { quantity: "1", item: "oignon", note: "émincé" },
      { quantity: "1", item: "carotte", note: "en dés" },
      { quantity: "1", item: "branche de céleri", note: "ciselée" },
      { quantity: "1 c. à s.", item: "de concentré de tomate" },
      { quantity: "1 c. à c.", item: "de cumin moulu" },
      { quantity: "200 g", item: "de lentilles corail" },
      { quantity: "1 L", item: "de bouillon de légumes" },
      { quantity: "1", item: "yaourt grec", note: "pour servir" },
    ],
    steps: [
      "Faites revenir l'oignon, la carotte et le céleri avec un filet d'huile.",
      "Ajoutez le concentré de tomate, le cumin et les lentilles.",
      "Versez le bouillon et laissez mijoter 15 minutes, mixez si désiré et servez avec le yaourt.",
    ],
  },
];

const PROTEIN_VARIANTS = [
  {
    key: "poulet",
    title: "poulet grillé",
    ingredient: { quantity: "250 g", item: "de filet de poulet", note: "émincé" },
    cookStep:
      "Saisissez le poulet dans une poêle bien chaude avec un filet d'huile pendant 5 minutes, jusqu'à ce qu'il soit doré.",
    category: "Rapide",
  },
  {
    key: "tofu",
    title: "tofu croustillant",
    ingredient: { quantity: "200 g", item: "de tofu ferme", note: "pressé et en dés" },
    cookStep:
      "Poêlez le tofu avec un filet d'huile 6 minutes en le retournant pour qu'il soit doré sur toutes les faces.",
    category: "Végétarien",
  },
  {
    key: "crevettes",
    title: "crevettes sautées",
    ingredient: { quantity: "220 g", item: "de crevettes", note: "décortiquées" },
    cookStep:
      "Saisissez les crevettes 3 minutes de chaque côté jusqu'à ce qu'elles rosissent légèrement.",
    category: "Poisson",
  },
  {
    key: "pois-chiches",
    title: "pois chiches rôtis",
    ingredient: { quantity: "300 g", item: "de pois chiches", note: "rincés et égouttés" },
    cookStep:
      "Faites revenir les pois chiches avec un filet d'huile et une pincée de paprika 6 minutes pour les rendre croustillants.",
    category: "Végétarien",
  },
  {
    key: "saumon",
    title: "saumon snacké",
    ingredient: { quantity: "2", item: "pavés de saumon", note: "coupés en cubes" },
    cookStep:
      "Snackez les cubes de saumon 2 minutes de chaque côté pour les dorer tout en gardant un cœur fondant.",
    category: "Poisson",
  },
  {
    key: "dinde",
    title: "émincé de dinde",
    ingredient: { quantity: "240 g", item: "d'escalope de dinde", note: "coupée en lanières" },
    cookStep:
      "Saisissez la dinde 4 minutes à feu vif avec une pincée de paprika fumé.",
    category: "Rapide",
  },
  {
    key: "lentilles",
    title: "lentilles parfumées",
    ingredient: { quantity: "260 g", item: "de lentilles cuites" },
    cookStep:
      "Réchauffez les lentilles avec un filet d'huile d'olive et une pincée de curcuma pendant 4 minutes.",
    category: "Végétarien",
  },
  {
    key: "tempeh",
    title: "tempeh caramélisé",
    ingredient: { quantity: "200 g", item: "de tempeh", note: "en lamelles" },
    cookStep:
      "Faites revenir le tempeh avec un filet de sirop d'érable et de tamari pour le caraméliser légèrement.",
    category: "Végétarien",
  },
];

const CARB_VARIANTS = [
  {
    key: "quinoa",
    title: "quinoa léger",
    ingredient: { quantity: "180 g", item: "de quinoa", note: "rincé" },
    cookStep:
      "Rincez le quinoa puis cuisez-le dans deux fois son volume d'eau 12 minutes et aérez-le à la fourchette.",
  },
  {
    key: "nouilles-soba",
    title: "nouilles soba",
    ingredient: { quantity: "180 g", item: "de nouilles soba" },
    cookStep:
      "Cuisez les nouilles soba 6 minutes, rincez-les à l'eau froide et égouttez-les bien.",
  },
  {
    key: "riz-basmati",
    title: "riz basmati",
    ingredient: { quantity: "200 g", item: "de riz basmati" },
    cookStep:
      "Rincez le riz basmati puis cuisez-le 10 minutes à feu doux dans 1,5 volume d'eau.",
  },
  {
    key: "semoule",
    title: "semoule minute",
    ingredient: { quantity: "180 g", item: "de semoule de blé" },
    cookStep:
      "Versez de l'eau bouillante sur la semoule, couvrez 5 minutes puis égrenez à la fourchette.",
  },
  {
    key: "pates-completes",
    title: "pâtes complètes",
    ingredient: { quantity: "220 g", item: "de penne complètes" },
    cookStep:
      "Cuisez les penne complètes al dente puis égouttez-les en conservant un peu d'eau de cuisson.",
  },
];

const VEGETABLE_VARIANTS = [
  {
    key: "poivron-courgette",
    title: "poivron & courgette",
    ingredients: [
      { quantity: "1", item: "poivron rouge", note: "en lanières" },
      { quantity: "1", item: "courgette", note: "en demi-lunes" },
    ],
    prepStep:
      "Émincez le poivron et la courgette, puis faites-les sauter 4 minutes pour les garder croquants.",
  },
  {
    key: "brocoli-carotte",
    title: "brocoli & carotte",
    ingredients: [
      { quantity: "1", item: "tête de brocoli", note: "en fleurettes" },
      { quantity: "2", item: "carottes", note: "en rubans" },
    ],
    prepStep:
      "Blanchissez le brocoli 2 minutes et faites revenir les rubans de carotte 1 minute avec une pointe d'huile de sésame.",
  },
  {
    key: "champignons-epinards",
    title: "champignons & épinards",
    ingredients: [
      { quantity: "250 g", item: "de champignons", note: "émincés" },
      { quantity: "1 poignée", item: "d'épinards", note: "lavés" },
    ],
    prepStep:
      "Poêlez les champignons jusqu'à évaporation de l'eau puis ajoutez les épinards juste pour les attendrir.",
  },
  {
    key: "tomate-courge",
    title: "tomate & courge",
    ingredients: [
      { quantity: "200 g", item: "de tomates cerises", note: "coupées en deux" },
      { quantity: "200 g", item: "de courge butternut", note: "en petits dés" },
    ],
    prepStep:
      "Rôtissez la courge 15 minutes avec un filet d'huile puis ajoutez les tomates pour les confire légèrement.",
  },
  {
    key: "chou-asiatique",
    title: "pak choï & edamame",
    ingredients: [
      { quantity: "2", item: "pak choï", note: "émincés" },
      { quantity: "150 g", item: "d'edamame", note: "décortiqués" },
    ],
    prepStep:
      "Saisissez le pak choï dans une poêle bien chaude 2 minutes puis ajoutez les edamame pour les réchauffer.",
  },
  {
    key: "courge-epices",
    title: "courge épicée",
    ingredients: [
      { quantity: "250 g", item: "de courge", note: "en cubes" },
      { quantity: "1", item: "poireau", note: "émincé finement" },
    ],
    prepStep:
      "Rôtissez la courge avec une pincée de paprika doux 18 minutes et faites fondre le poireau doucement à la poêle.",
  },
];

const SAUCE_VARIANTS = [
  {
    key: "coco-citronnelle",
    title: "bol coco citronnelle",
    sauceIngredient: { quantity: "200 ml", item: "de lait de coco" },
    mixStep:
      "Versez le lait de coco avec une tige de citronnelle écrasée et laissez infuser 5 minutes avec une pincée de sel.",
    category: "Exotique",
  },
  {
    key: "pesto-basilic",
    title: "pesto basilic",
    sauceIngredient: { quantity: "4 c. à s.", item: "de pesto basilic" },
    mixStep:
      "Mélangez le pesto avec un peu d'eau de cuisson pour le détendre et enrober les ingrédients.",
    category: "Rapide",
  },
  {
    key: "sauce-miel-soja",
    title: "glacé miel-soja",
    sauceIngredient: { quantity: "3 c. à s.", item: "de sauce soja" },
    mixStep:
      "Ajoutez la sauce soja, une cuillère de miel et laissez réduire 2 minutes pour napper la préparation.",
    category: "Rapide",
  },
  {
    key: "vinaigrette-gingembre",
    title: "vinaigrette gingembre",
    sauceIngredient: { quantity: "3 c. à s.", item: "de vinaigrette gingembre-sésame" },
    mixStep:
      "Fouettez la vinaigrette avec une cuillère d'huile de sésame et versez sur les ingrédients encore tièdes.",
    category: "Végétarien",
  },
  {
    key: "salsa-tomate",
    title: "salsa tomate fumée",
    sauceIngredient: { quantity: "200 g", item: "de salsa tomate fumée" },
    mixStep:
      "Réchauffez la salsa avec une pincée de piment doux puis mélangez aux légumes et à la base.",
    category: "Convivial",
  },
];

const FINISH_VARIANTS = [
  {
    key: "citron-vert",
    garnishIngredient: { quantity: "1", item: "citron vert", note: "en quartiers" },
    finishStep:
      "Arrosez le plat de jus de citron vert et parsemez de zeste juste avant de servir.",
    category: "Frais",
  },
  {
    key: "herbes-fraiches",
    garnishIngredient: { quantity: "1 poignée", item: "d'herbes fraîches", note: "ciselées" },
    finishStep:
      "Parsemez généreusement d'herbes fraîches pour apporter croquant et fraîcheur.",
    category: "Équilibré",
  },
  {
    key: "noix-grillees",
    garnishIngredient: { quantity: "40 g", item: "de noix grillées", note: "concassées" },
    finishStep:
      "Saupoudrez de noix grillées pour ajouter du croquant.",
    category: "Gourmand",
  },
  {
    key: "graines-torrefiees",
    garnishIngredient: { quantity: "3 c. à s.", item: "de graines torréfiées" },
    finishStep:
      "Ajoutez les graines torréfiées et mélangez délicatement pour préserver le croquant.",
    category: "Énergie",
  },
  {
    key: "yaourt-menthe",
    garnishIngredient: { quantity: "2 c. à s.", item: "de yaourt à la menthe" },
    finishStep:
      "Déposez quelques cuillerées de yaourt mentholé pour un contraste frais et onctueux.",
    category: "Douceur",
  },
];

const TARGET_RECIPE_COUNT = 1000;

function capitalizeFirst(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildQuickRecipes() {
  const generated = [];
  const needed = TARGET_RECIPE_COUNT - BASE_RECIPES.length;
  const totalProtein = PROTEIN_VARIANTS.length;
  const totalCarb = CARB_VARIANTS.length;
  const totalVeg = VEGETABLE_VARIANTS.length;
  const totalSauce = SAUCE_VARIANTS.length;
  const totalFinish = FINISH_VARIANTS.length;

  for (let index = 0; index < needed; index += 1) {
    const protein = PROTEIN_VARIANTS[index % totalProtein];
    const carb = CARB_VARIANTS[Math.floor(index / totalProtein) % totalCarb];
    const veg =
      VEGETABLE_VARIANTS[
        Math.floor(index / (totalProtein * totalCarb)) % totalVeg
      ];
    const sauce =
      SAUCE_VARIANTS[
        Math.floor(index / (totalProtein * totalCarb * totalVeg)) % totalSauce
      ];
    const finish =
      FINISH_VARIANTS[
        Math.floor(
          index /
            (totalProtein * totalCarb * totalVeg * totalSauce)
        ) % totalFinish
      ];

    const baseTitle = `${capitalizeFirst(sauce.title)} ${protein.title}`;
    const title = `${baseTitle} avec ${veg.title}`;
    const calories = 360 + ((index * 17) % 240);
    const prepTime = 8 + (index % 6);
    const cookTime = 10 + ((index * 3) % 12);
    const categoryOptions = [
      sauce.category,
      finish.category,
      protein.category,
    ].filter(Boolean);
    const category = categoryOptions[0] || "Facile & rapide";

    const ingredients = [
      protein.ingredient,
      ...veg.ingredients,
      carb.ingredient,
      sauce.sauceIngredient,
      finish.garnishIngredient,
    ];

    const steps = [
      veg.prepStep,
      carb.cookStep,
      protein.cookStep,
      `${sauce.mixStep} ${finish.finishStep}`,
    ];

    generated.push({
      id: `express-${index + 1}-${protein.key}-${carb.key}-${sauce.key}-${finish.key}`,
      title,
      category,
      prepTime,
      cookTime,
      calories,
      ingredients,
      steps,
    });
  }

  return generated;
}

export const RECIPE_DATA = Object.freeze(
  [...BASE_RECIPES, ...buildQuickRecipes()].map((recipe) =>
    Object.freeze({
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) =>
        Object.freeze({ ...ingredient })
      ),
      steps: recipe.steps.slice(),
    })
  )
);

export function getRecipeById(id) {
  return RECIPE_DATA.find((recipe) => recipe.id === id) || null;
}
