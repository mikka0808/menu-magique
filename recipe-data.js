function ingredient(quantity, item, note) {
  return note ? { quantity, item, note } : { quantity, item };
}

function cloneIngredient(entry) {
  return { ...entry };
}

function cloneList(list = []) {
  return list.map(cloneIngredient);
}

const SALAD_BASE_INGREDIENTS = [
  ingredient("2 poignées", "de jeunes pousses"),
  ingredient("1", "échalote", "finement ciselée"),
  ingredient("2 c. à s.", "d'huile d'olive"),
  ingredient("1 c. à s.", "de vinaigre de cidre"),
  ingredient("1 pincée", "de fleur de sel"),
];

const SALAD_VEGETABLES = [
  {
    id: "tomates-anciennes",
    title: "tomates anciennes",
    ingredient: ingredient("4", "tomates anciennes", "en quartiers"),
    step: "les tomates anciennes en quartiers",
    garnish: "quelques feuilles de basilic",
    prep: 6,
    calories: 90,
  },
  {
    id: "concombre-croquant",
    title: "concombre croquant",
    ingredient: ingredient("1", "concombre", "en demi-lunes"),
    step: "le concombre croquant",
    garnish: "de l'aneth ciselé",
    prep: 5,
    calories: 60,
  },
  {
    id: "carottes-rubans",
    title: "carottes en rubans",
    ingredient: ingredient("3", "carottes", "taillées en rubans"),
    step: "les rubans de carottes",
    garnish: "des graines de sésame toastées",
    prep: 7,
    calories: 70,
  },
  {
    id: "betteraves-fondantes",
    title: "betteraves fondantes",
    ingredient: ingredient("2", "betteraves cuites", "coupées en dés"),
    step: "les dés de betterave",
    garnish: "quelques noix concassées",
    prep: 6,
    calories: 80,
  },
  {
    id: "fenouil-cisele",
    title: "fenouil croustillant",
    ingredient: ingredient("1", "bulbe de fenouil", "finement émincé"),
    step: "le fenouil finement émincé",
    garnish: "du zeste de citron",
    prep: 5,
    calories: 50,
  },
  {
    id: "courgette-crue",
    title: "courgette crue",
    ingredient: ingredient("2", "petites courgettes", "en fines lamelles"),
    step: "les lamelles de courgette",
    garnish: "des copeaux de parmesan",
    prep: 6,
    calories: 55,
  },
  {
    id: "haricots-verts",
    title: "haricots verts",
    ingredient: ingredient("150 g", "de haricots verts", "blanchis et coupés"),
    step: "les haricots verts croquants",
    garnish: "de l'estragon frais",
    prep: 8,
    calories: 70,
  },
  {
    id: "asperges-vertes",
    title: "asperges vertes",
    ingredient: ingredient("8", "asperges vertes", "en tronçons"),
    step: "les asperges vertes en tronçons",
    garnish: "des copeaux de pecorino",
    prep: 7,
    calories: 65,
  },
  {
    id: "radis-roses",
    title: "radis roses",
    ingredient: ingredient("1 botte", "de radis roses", "en fines rondelles"),
    step: "les rondelles de radis",
    garnish: "un peu de beurre demi-sel fondu",
    prep: 5,
    calories: 45,
  },
  {
    id: "pommes-croquees",
    title: "pommes croquantes",
    ingredient: ingredient("2", "pommes", "en fins quartiers"),
    step: "les quartiers de pomme",
    garnish: "quelques noisettes concassées",
    prep: 6,
    calories: 75,
  },
  {
    id: "endives-douces",
    title: "endives douces",
    ingredient: ingredient("2", "endives", "émincées"),
    step: "les endives finement émincées",
    garnish: "des noix torréfiées",
    prep: 6,
    calories: 40,
  },
  {
    id: "tomates-cerise",
    title: "tomates cerises",
    ingredient: ingredient("300 g", "de tomates cerises", "coupées en deux"),
    step: "les tomates cerises juteuses",
    garnish: "du thym frais",
    prep: 5,
    calories: 60,
  },
];

const SALAD_PROTEINS = [
  {
    id: "burrata",
    title: "burrata crémeuse",
    ingredient: ingredient("1", "burrata", "déchirée"),
    step: "la burrata délicatement effilochée",
    garnish: "un filet d'huile d'olive et du basilic",
    prep: 2,
    calories: 220,
  },
  {
    id: "chevre-frais",
    title: "fromage de chèvre frais",
    ingredient: ingredient("120 g", "de fromage de chèvre frais", "émietté"),
    step: "le chèvre frais émietté",
    garnish: "de la ciboulette",
    prep: 3,
    calories: 180,
  },
  {
    id: "poulet-roti",
    title: "émincé de poulet rôti",
    ingredient: ingredient("200 g", "de poulet rôti", "effiloché"),
    step: "le poulet rôti effiloché",
    garnish: "un soupçon de moutarde à l'ancienne",
    prep: 5,
    calories: 210,
  },
  {
    id: "thon-marin",
    title: "thon mariné",
    ingredient: ingredient("1 boîte", "de thon au naturel", "égoutté"),
    step: "le thon émietté",
    garnish: "du persil plat",
    prep: 3,
    calories: 190,
  },
  {
    id: "oeuf-mollet",
    title: "œufs mollets",
    ingredient: ingredient("2", "œufs mollets", "coupés en deux"),
    step: "les œufs mollets encore tièdes",
    garnish: "du paprika doux",
    prep: 6,
    calories: 170,
  },
  {
    id: "jambon-cru",
    title: "jambon cru",
    ingredient: ingredient("4 tranches", "de jambon cru", "en lanières"),
    step: "les lanières de jambon cru",
    garnish: "de la roquette",
    prep: 4,
    calories: 200,
  },
  {
    id: "lentilles",
    title: "lentilles vertes tièdes",
    ingredient: ingredient("200 g", "de lentilles vertes", "cuites"),
    step: "les lentilles vertes tièdes",
    garnish: "un filet de vinaigre de vin rouge",
    prep: 8,
    calories: 180,
  },
  {
    id: "saumon-fume",
    title: "saumon fumé",
    ingredient: ingredient("120 g", "de saumon fumé", "en lanières"),
    step: "le saumon fumé délicatement roulé",
    garnish: "de l'aneth frais",
    prep: 4,
    calories: 200,
  },
];


const SOUP_BASE_INGREDIENTS = [
  ingredient("1", "oignon", "émincé"),
  ingredient("1", "gousse d'ail", "hachée"),
  ingredient("1 c. à s.", "de beurre"),
  ingredient("750 ml", "de bouillon de légumes"),
  ingredient("1", "feuille de laurier"),
];

const SOUP_VEGETABLES = [
  {
    id: "butternut",
    title: "velouté de courge butternut",
    ingredient: ingredient("500 g", "de courge butternut", "en cubes"),
    step: "la courge butternut en cubes",
    cookTime: 25,
    calories: 140,
  },
  {
    id: "carotte-cumin",
    title: "carottes au cumin",
    ingredient: ingredient("5", "carottes", "en rondelles"),
    step: "les carottes parfumées au cumin",
    cookTime: 20,
    calories: 120,
  },
  {
    id: "poireau-pomme-de-terre",
    title: "poireaux et pommes de terre",
    ingredient: ingredient("3", "poireaux", "en tronçons"),
    extraIngredients: [ingredient("2", "pommes de terre", "en dés")],
    step: "les poireaux fondants et les pommes de terre",
    cookTime: 22,
    calories: 150,
  },
  {
    id: "champignons",
    title: "champignons de Paris",
    ingredient: ingredient("400 g", "de champignons de Paris", "émincés"),
    step: "les champignons dorés",
    cookTime: 18,
    calories: 110,
  },
  {
    id: "petits-pois",
    title: "petits pois mentholés",
    ingredient: ingredient("400 g", "de petits pois"),
    step: "les petits pois sucrés",
    cookTime: 15,
    calories: 130,
  },
  {
    id: "brocoli",
    title: "brocoli doux",
    ingredient: ingredient("1", "tête de brocoli", "en fleurettes"),
    step: "les fleurettes de brocoli",
    cookTime: 17,
    calories: 120,
  },
  {
    id: "chou-fleur",
    title: "chou-fleur rôti",
    ingredient: ingredient("1", "petit chou-fleur", "en fleurettes"),
    step: "le chou-fleur légèrement rôti",
    cookTime: 18,
    calories: 115,
  },
  {
    id: "lentilles-corail",
    title: "lentilles corail",
    ingredient: ingredient("200 g", "de lentilles corail"),
    step: "les lentilles corail fondantes",
    cookTime: 22,
    calories: 170,
  },
  {
    id: "tomates",
    title: "tomates confites",
    ingredient: ingredient("600 g", "de tomates", "concassées"),
    step: "les tomates mijotées",
    cookTime: 20,
    calories: 130,
  },
  {
    id: "pommes-de-terre",
    title: "pommes de terre",
    ingredient: ingredient("500 g", "de pommes de terre", "en dés"),
    step: "les pommes de terre fondantes",
    cookTime: 25,
    calories: 160,
  },
];

const SOUP_FINISHES = [
  {
    id: "creme-fraiche",
    garnish: "une cuillerée de crème fraîche",
    calories: 45,
  },
  {
    id: "persil-citron",
    garnish: "du persil plat et un zeste de citron",
    calories: 10,
  },
  {
    id: "lardons-croustillants",
    garnish: "des lardons croustillants",
    calories: 70,
  },
  {
    id: "fromage-rape",
    garnish: "du comté râpé",
    calories: 60,
  },
  {
    id: "huile-noisette",
    garnish: "un filet d'huile de noisette",
    calories: 50,
  },
  {
    id: "croutons",
    garnish: "quelques croûtons dorés",
    calories: 55,
  },
];


const SKILLET_BASE_INGREDIENTS = [
  ingredient("1", "oignon", "émincé"),
  ingredient("2 c. à s.", "d'huile d'olive"),
  ingredient("1", "gousse d'ail", "écrasée"),
];

const SKILLET_VEGETABLES = [
  {
    id: "ratatouille-douce",
    title: "ratatouille douce",
    ingredient: ingredient("1", "courgette", "en demi-lunes"),
    extraIngredients: [
      ingredient("1", "aubergine", "en dés"),
      ingredient("1", "poivron rouge", "en lamelles"),
      ingredient("2", "tomates", "concassées"),
    ],
    step: "la ratatouille de légumes fondants",
    cookTime: 18,
    calories: 120,
  },
  {
    id: "poireaux-fondants",
    title: "poireaux fondants",
    ingredient: ingredient("3", "poireaux", "émincés"),
    step: "les poireaux devenus fondants",
    cookTime: 15,
    calories: 90,
  },
  {
    id: "chou-fleur-poelee",
    title: "chou-fleur doré",
    ingredient: ingredient("1", "petit chou-fleur", "en fleurettes"),
    step: "le chou-fleur doré",
    cookTime: 14,
    calories: 85,
  },
  {
    id: "courge-rotie",
    title: "courge rôtie",
    ingredient: ingredient("400 g", "de courge", "en cubes"),
    step: "la courge dorée",
    cookTime: 16,
    calories: 110,
  },
  {
    id: "champignons-persille",
    title: "champignons persillés",
    ingredient: ingredient("400 g", "de champignons", "émincés"),
    step: "les champignons persillés",
    cookTime: 12,
    calories: 95,
  },
  {
    id: "haricots-frais",
    title: "haricots verts au beurre",
    ingredient: ingredient("250 g", "de haricots verts", "blanchis"),
    step: "les haricots verts juste croquants",
    cookTime: 10,
    calories: 80,
  },
  {
    id: "blettes",
    title: "blettes à l'ail",
    ingredient: ingredient("1 botte", "de blettes", "émincées"),
    step: "les blettes fondantes",
    cookTime: 13,
    calories: 70,
  },
  {
    id: "pommes-terre-sautes",
    title: "pommes de terre sautées",
    ingredient: ingredient("400 g", "de pommes de terre", "en cubes"),
    step: "les pommes de terre dorées",
    cookTime: 15,
    calories: 140,
  },
  {
    id: "carottes-gingembre",
    title: "carottes au gingembre",
    ingredient: ingredient("4", "carottes", "en bâtonnets"),
    step: "les carottes légèrement glacées",
    cookTime: 12,
    calories: 85,
  },
  {
    id: "poivrons-doux",
    title: "poivrons doux",
    ingredient: ingredient("3", "poivrons", "en lanières"),
    step: "les poivrons fondants",
    cookTime: 13,
    calories: 90,
  },
  {
    id: "courgette-tomate",
    title: "courgettes tomatées",
    ingredient: ingredient("2", "courgettes", "en demi-lunes"),
    extraIngredients: [ingredient("200 g", "de pulpe de tomate")],
    step: "les courgettes nappées de tomate",
    cookTime: 14,
    calories: 95,
  },
  {
    id: "patates-douces",
    title: "patates douces",
    ingredient: ingredient("2", "patates douces", "en dés"),
    step: "les patates douces caramélisées",
    cookTime: 16,
    calories: 150,
  },
];

const SKILLET_PROTEINS = [
  {
    id: "poulet-thym",
    ingredient: ingredient("250 g", "de filet de poulet", "en lamelles"),
    step: "le poulet saisi au thym",
    garnish: "un filet de jus de citron",
    cookTime: 8,
    calories: 190,
  },
  {
    id: "saumon",
    ingredient: ingredient("200 g", "de saumon", "en dés"),
    step: "le saumon mi-cuit",
    garnish: "de l'aneth frais",
    cookTime: 6,
    calories: 210,
  },
  {
    id: "tofu-herbes",
    ingredient: ingredient("200 g", "de tofu ferme", "en cubes"),
    step: "le tofu doré aux herbes",
    garnish: "des graines de sésame",
    cookTime: 7,
    calories: 150,
  },
  {
    id: "crevettes",
    ingredient: ingredient("200 g", "de crevettes", "décortiquées"),
    step: "les crevettes nacrées",
    garnish: "du persil plat",
    cookTime: 5,
    calories: 160,
  },
  {
    id: "lardons",
    ingredient: ingredient("150 g", "de lardons fumés"),
    step: "les lardons croustillants",
    garnish: "du poivre du moulin",
    cookTime: 6,
    calories: 180,
  },
  {
    id: "pois-chiches",
    ingredient: ingredient("200 g", "de pois chiches", "cuits"),
    step: "les pois chiches dorés",
    garnish: "du paprika fumé",
    cookTime: 7,
    calories: 160,
  },
];


const PASTA_BASE_INGREDIENTS = [
  ingredient("250 g", "de pâtes fraîches"),
  ingredient("2 c. à s.", "d'eau de cuisson des pâtes"),
  ingredient("1 c. à s.", "d'huile d'olive"),
];

const PASTA_SAUCES = [
  {
    id: "tomate-basilic",
    title: "pâtes tomate basilic",
    ingredient: ingredient("300 g", "de sauce tomate maison"),
    step: "enrobées de sauce tomate parfumée au basilic",
    cookTime: 8,
    calories: 180,
  },
  {
    id: "creme-champignons",
    title: "pâtes crème de champignons",
    ingredient: ingredient("250 g", "de champignons", "émincés"),
    extraIngredients: [ingredient("150 ml", "de crème légère")],
    step: "napées d'une crème de champignons",
    cookTime: 9,
    calories: 210,
  },
  {
    id: "pesto-basilic",
    title: "pâtes au pesto de basilic",
    ingredient: ingredient("4 c. à s.", "de pesto de basilic"),
    step: "enrobées de pesto maison",
    cookTime: 3,
    calories: 220,
  },
  {
    id: "citron-ricotta",
    title: "pâtes citron ricotta",
    ingredient: ingredient("150 g", "de ricotta"),
    extraIngredients: [ingredient("1", "citron", "zeste et jus")],
    step: "liées avec une crème citronnée",
    cookTime: 4,
    calories: 200,
  },
  {
    id: "legumes-soleil",
    title: "pâtes aux légumes du soleil",
    ingredient: ingredient("1", "poivron rouge", "en lanières"),
    extraIngredients: [
      ingredient("1", "courgette", "en demi-lunes"),
      ingredient("6", "tomates cerises", "coupées en deux"),
    ],
    step: "parsemées de légumes du soleil fondants",
    cookTime: 9,
    calories: 190,
  },
  {
    id: "bleu-noix",
    title: "pâtes crème de bleu et noix",
    ingredient: ingredient("100 g", "de fromage bleu"),
    extraIngredients: [
      ingredient("40 g", "de noix", "concassées"),
      ingredient("100 ml", "de crème légère"),
    ],
    step: "mélangées à une crème de bleu et noix",
    cookTime: 5,
    calories: 230,
  },
  {
    id: "ail-persillade",
    title: "pâtes ail et persil",
    ingredient: ingredient("3", "gousses d'ail", "émincées"),
    extraIngredients: [ingredient("1/2 botte", "de persil plat", "ciselé")],
    step: "sautées à l'ail et persil",
    cookTime: 4,
    calories: 180,
  },
  {
    id: "courge-sauge",
    title: "pâtes courge et sauge",
    ingredient: ingredient("300 g", "de courge rôtie", "en cubes"),
    extraIngredients: [ingredient("6", "feuilles de sauge", "frittes")],
    step: "mélangées à la courge rôtie et à la sauge",
    cookTime: 8,
    calories: 200,
  },
  {
    id: "poireau-creme",
    title: "pâtes poireaux fondants",
    ingredient: ingredient("2", "poireaux", "émincés"),
    extraIngredients: [ingredient("120 ml", "de crème fraîche")],
    step: "liées à des poireaux fondants",
    cookTime: 7,
    calories: 190,
  },
  {
    id: "ratatouille",
    title: "pâtes à la ratatouille",
    ingredient: ingredient("250 g", "de ratatouille maison"),
    step: "mêlées à de la ratatouille parfumée",
    cookTime: 8,
    calories: 210,
  },
];

const PASTA_FINISHES = [
  { id: "basilic-frais", garnish: "du basilic frais ciselé", calories: 5 },
  { id: "parmesan", garnish: "des copeaux de parmesan", calories: 40 },
  { id: "roquette", garnish: "une poignée de roquette", calories: 15 },
  { id: "noisettes", garnish: "des noisettes torréfiées", calories: 35 },
  { id: "citron-confit", garnish: "quelques zestes de citron confit", calories: 12 },
  { id: "pignons", garnish: "des pignons de pin toastés", calories: 45 },
];


const GRATIN_BASE_INGREDIENTS = [
  ingredient("1", "gousse d'ail", "hachée"),
  ingredient("200 ml", "de crème fraîche légère"),
  ingredient("120 g", "de fromage râpé"),
  ingredient("1", "noix de beurre"),
];

const GRATIN_VEGETABLES = [
  {
    id: "dauphinois",
    title: "gratin dauphinois",
    ingredient: ingredient("800 g", "de pommes de terre", "en fines lamelles"),
    step: "les pommes de terre en couches régulières",
    cookTime: 35,
    calories: 210,
  },
  {
    id: "courgette",
    title: "gratin de courgettes",
    ingredient: ingredient("4", "courgettes", "en rondelles"),
    step: "les courgettes superposées",
    cookTime: 28,
    calories: 150,
  },
  {
    id: "chou-fleur",
    title: "gratin de chou-fleur",
    ingredient: ingredient("1", "chou-fleur", "en fleurettes"),
    step: "le chou-fleur nappé de sauce",
    cookTime: 30,
    calories: 160,
  },
  {
    id: "brocoli",
    title: "gratin de brocoli",
    ingredient: ingredient("1", "tête de brocoli", "en fleurettes"),
    step: "le brocoli bien serré",
    cookTime: 27,
    calories: 155,
  },
  {
    id: "fenouil",
    title: "gratin de fenouil",
    ingredient: ingredient("2", "bulbes de fenouil", "en lamelles"),
    step: "le fenouil anisé",
    cookTime: 25,
    calories: 145,
  },
  {
    id: "poireaux",
    title: "gratin de poireaux",
    ingredient: ingredient("4", "poireaux", "en tronçons"),
    step: "les poireaux fondants",
    cookTime: 26,
    calories: 150,
  },
  {
    id: "epinards",
    title: "gratin d'épinards",
    ingredient: ingredient("400 g", "d'épinards", "cuits et égouttés"),
    step: "les épinards bien tassés",
    cookTime: 24,
    calories: 140,
  },
  {
    id: "patate-douce",
    title: "gratin de patate douce",
    ingredient: ingredient("700 g", "de patates douces", "en fines tranches"),
    step: "les patates douces en éventail",
    cookTime: 32,
    calories: 200,
  },
];

const GRATIN_TOPPINGS = [
  { id: "chevre-miel", garnish: "du chèvre frais émietté et un filet de miel", calories: 90 },
  { id: "noix-muscade", garnish: "une pointe de muscade et du gruyère", calories: 60 },
  { id: "jambon-blanc", garnish: "des lamelles de jambon blanc", calories: 80 },
  { id: "saumon-fume", garnish: "quelques lanières de saumon fumé", calories: 85 },
  { id: "noisettes-croc", garnish: "des noisettes concassées", calories: 70 },
  { id: "bleu-persille", garnish: "des miettes de bleu persillé", calories: 95 },
];


const POULTRY_BASE_INGREDIENTS = [
  ingredient("4", "cuisses de poulet"),
  ingredient("2 c. à s.", "d'huile d'olive"),
  ingredient("2", "gousses d'ail", "écrasées"),
  ingredient("1", "branche de thym"),
];

const POULTRY_MARINADES = [
  {
    id: "citron-herbes",
    title: "poulet citron herbes",
    extraIngredients: [
      ingredient("1", "citron", "jus et zeste"),
      ingredient("1 c. à s.", "d'herbes de Provence"),
    ],
    step: "mariné au citron et aux herbes",
    cookTime: 35,
    calories: 260,
  },
  {
    id: "moutarde-miel",
    title: "poulet miel moutarde",
    extraIngredients: [
      ingredient("2 c. à s.", "de moutarde à l'ancienne"),
      ingredient("1 c. à s.", "de miel"),
    ],
    step: "enveloppé de miel et de moutarde",
    cookTime: 33,
    calories: 270,
  },
  {
    id: "paprika-doux",
    title: "poulet paprika doux",
    extraIngredients: [
      ingredient("2 c. à c.", "de paprika doux"),
      ingredient("1 c. à c.", "de cumin"),
    ],
    step: "parfumé au paprika doux",
    cookTime: 32,
    calories: 255,
  },
  {
    id: "ail-persil",
    title: "poulet ail persil",
    extraIngredients: [
      ingredient("1/2 botte", "de persil plat", "ciselé"),
      ingredient("1", "citron", "en quartiers"),
    ],
    step: "rôti à l'ail et persil",
    cookTime: 34,
    calories: 250,
  },
  {
    id: "olive-tomate",
    title: "poulet olives tomates",
    extraIngredients: [
      ingredient("10", "olives vertes"),
      ingredient("200 g", "de pulpe de tomate"),
    ],
    step: "mijoté aux olives et tomates",
    cookTime: 36,
    calories: 275,
  },
  {
    id: "curry-doux",
    title: "poulet curry doux",
    extraIngredients: [
      ingredient("1 c. à s.", "de poudre de curry doux"),
      ingredient("150 ml", "de lait de coco"),
    ],
    step: "velouté au curry doux",
    cookTime: 30,
    calories: 280,
  },
];

const POULTRY_FINISHES = [
  { id: "legumes-printemps", garnish: "avec des carottes et navets glacés", calories: 80 },
  { id: "pommes-four", garnish: "accompagné de pommes de terre rôties", calories: 120 },
  { id: "champignons-persille", garnish: "servi avec des champignons persillés", calories: 70 },
  { id: "riz-basmati", garnish: "posé sur un lit de riz basmati", calories: 110 },
  { id: "polenta", garnish: "avec une polenta crémeuse", calories: 130 },
  { id: "ratatouille", garnish: "accompagné d'une ratatouille maison", calories: 90 },
];

const FISH_BASE_INGREDIENTS = [
  ingredient("4", "filets de poisson blanc"),
  ingredient("1", "citron", "en rondelles"),
  ingredient("1 c. à s.", "d'huile d'olive"),
  ingredient("1", "échalote", "ciselée"),
];

const FISH_MARINADES = [
  {
    id: "beurre-citron",
    title: "poisson beurre citron",
    extraIngredients: [
      ingredient("40 g", "de beurre demi-sel", "fondu"),
      ingredient("1", "citron", "jus"),
    ],
    step: "nappé de beurre citron",
    cookTime: 15,
    calories: 210,
  },
  {
    id: "herbes-provence",
    title: "poisson aux herbes de Provence",
    extraIngredients: [
      ingredient("2 c. à c.", "d'herbes de Provence"),
      ingredient("1 c. à s.", "d'huile d'olive"),
    ],
    step: "parfumé aux herbes de Provence",
    cookTime: 14,
    calories: 190,
  },
  {
    id: "tomates-olives",
    title: "poisson tomates olives",
    extraIngredients: [
      ingredient("200 g", "de tomates concassées"),
      ingredient("12", "olives noires", "dénoyautées"),
    ],
    step: "cuit avec tomates et olives",
    cookTime: 17,
    calories: 205,
  },
  {
    id: "beurre-aigre-doux",
    title: "poisson beurre ail doux",
    extraIngredients: [
      ingredient("30 g", "de beurre"),
      ingredient("2", "gousses d'ail", "émincées"),
    ],
    step: "doré au beurre doux et ail",
    cookTime: 13,
    calories: 195,
  },
  {
    id: "citron-vert",
    title: "poisson citron vert",
    extraIngredients: [
      ingredient("2", "citrons verts", "jus et zeste"),
      ingredient("1 c. à s.", "de coriandre fraîche", "ciselée"),
    ],
    step: "arrosé de citron vert",
    cookTime: 14,
    calories: 185,
  },
  {
    id: "moutarde-ancienne",
    title: "poisson moutarde ancienne",
    extraIngredients: [
      ingredient("2 c. à s.", "de moutarde à l'ancienne"),
      ingredient("100 ml", "de crème fraîche"),
    ],
    step: "nappé de moutarde à l'ancienne",
    cookTime: 16,
    calories: 215,
  },
];

const FISH_FINISHES = [
  { id: "poireaux-fondants", garnish: "posé sur des poireaux fondants", calories: 60 },
  { id: "legumes-vapeur", garnish: "servi avec des légumes vapeur", calories: 55 },
  { id: "pommes-ecrasees", garnish: "accompagné d'une écrasée de pommes de terre", calories: 95 },
  { id: "riz-safran", garnish: "avec un riz au safran léger", calories: 100 },
  { id: "salade-fraiche", garnish: "avec une salade de fenouil et orange", calories: 45 },
  { id: "lentilles-corail", garnish: "sur un lit de lentilles corail", calories: 85 },
];


const OMELETTE_BASE_INGREDIENTS = [
  ingredient("4", "œufs"),
  ingredient("1 c. à s.", "de beurre demi-sel"),
  ingredient("1 pincée", "de sel fin"),
  ingredient("1 tour", "de poivre"),
];

const OMELETTE_FILLINGS = [
  {
    id: "champignons-persille",
    ingredient: ingredient("200 g", "de champignons", "émincés"),
    step: "les champignons revenus au beurre",
    prep: 5,
    calories: 80,
  },
  {
    id: "fines-herbes",
    ingredient: ingredient("1/2 botte", "de fines herbes", "ciselées"),
    step: "les fines herbes parfumées",
    prep: 4,
    calories: 40,
  },
  {
    id: "fromage-comte",
    ingredient: ingredient("80 g", "de comté", "râpé"),
    step: "le comté râpé fondant",
    prep: 3,
    calories: 120,
  },
  {
    id: "courgette-menthe",
    ingredient: ingredient("1", "courgette", "râpée"),
    step: "la courgette râpée avec menthe",
    prep: 5,
    calories: 60,
  },
  {
    id: "poivron-doux",
    ingredient: ingredient("1", "poivron rouge", "en petits dés"),
    step: "les petits dés de poivron",
    prep: 6,
    calories: 55,
  },
  {
    id: "pomme-terre",
    ingredient: ingredient("2", "pommes de terre", "en dés"),
    step: "les dés de pommes de terre fondants",
    prep: 8,
    calories: 110,
  },
  {
    id: "epinards",
    ingredient: ingredient("150 g", "d'épinards", "émincés"),
    step: "les épinards tombés au beurre",
    prep: 4,
    calories: 70,
  },
  {
    id: "tomate-oignon",
    ingredient: ingredient("2", "tomates", "épépinées et en dés"),
    step: "les dés de tomate et d'oignon doux",
    extraIngredients: [ingredient("1", "petit oignon", "ciselé")],
    prep: 6,
    calories: 65,
  },
  {
    id: "oignons-confits",
    ingredient: ingredient("2", "oignons", "confit lentement"),
    step: "les oignons confits",
    prep: 10,
    calories: 95,
  },
];

const OMELETTE_FINISHES = [
  { id: "ciboulette", garnish: "de la ciboulette fraîche", calories: 5 },
  { id: "chevre-frais", garnish: "quelques éclats de chèvre frais", calories: 70 },
  { id: "jambon-blanc", garnish: "de fines lanières de jambon blanc", calories: 65 },
  { id: "saumon-fume", garnish: "des copeaux de saumon fumé", calories: 80 },
  { id: "roquette", garnish: "une poignée de roquette assaisonnée", calories: 10 },
  { id: "noix", garnish: "des éclats de noix grillées", calories: 50 },
];


const RICE_BASE_INGREDIENTS = [
  ingredient("250 g", "de riz basmati", "rincé"),
  ingredient("500 ml", "d'eau"),
  ingredient("1", "feuille de laurier"),
  ingredient("1", "échalote", "ciselée"),
];

const RICE_MIXES = [
  {
    id: "jardinieres",
    ingredient: ingredient("200 g", "de légumes jardinière", "carottes, petits pois, haricots"),
    step: "les légumes jardinière colorés",
    cookTime: 15,
    calories: 120,
  },
  {
    id: "champignons",
    ingredient: ingredient("200 g", "de champignons", "émincés"),
    step: "les champignons revenus à l'ail",
    cookTime: 12,
    calories: 90,
  },
  {
    id: "poireaux-curry",
    ingredient: ingredient("2", "poireaux", "émincés"),
    extraIngredients: [ingredient("1 c. à c.", "de curry doux")],
    step: "les poireaux au curry doux",
    cookTime: 14,
    calories: 100,
  },
  {
    id: "ratatouille",
    ingredient: ingredient("220 g", "de ratatouille maison"),
    step: "la ratatouille mijotée",
    cookTime: 15,
    calories: 130,
  },
  {
    id: "courgette-menthe",
    ingredient: ingredient("2", "courgettes", "en dés"),
    step: "les dés de courgette mentholés",
    cookTime: 11,
    calories: 85,
  },
  {
    id: "tomate-olive",
    ingredient: ingredient("4", "tomates", "concassées"),
    extraIngredients: [ingredient("10", "olives noires", "tranchées")],
    step: "les tomates et olives mijotées",
    cookTime: 13,
    calories: 115,
  },
  {
    id: "carotte-gingembre",
    ingredient: ingredient("3", "carottes", "râpées"),
    step: "les carottes au gingembre",
    cookTime: 12,
    calories: 95,
  },
  {
    id: "petits-pois-menthe",
    ingredient: ingredient("200 g", "de petits pois"),
    step: "les petits pois à la menthe",
    cookTime: 10,
    calories: 100,
  },
];

const RICE_TOPPINGS = [
  { id: "poulet-grille", garnish: "avec du poulet grillé en lamelles", calories: 160 },
  { id: "crevettes", garnish: "avec des crevettes poêlées", calories: 140 },
  { id: "tofu-croustillant", garnish: "avec du tofu croustillant", calories: 120 },
  { id: "legumes-croquants", garnish: "avec des légumes croquants vinaigrés", calories: 60 },
  { id: "oeuf-mollet", garnish: "avec un œuf mollet", calories: 80 },
];


const DESSERT_BASE_INGREDIENTS = [
  ingredient("30 g", "de beurre demi-sel"),
  ingredient("2 c. à s.", "de sucre de canne"),
  ingredient("1 c. à c.", "d'extrait de vanille"),
];

const DESSERT_FRUITS = [
  {
    id: "pomme-tatin",
    title: "pomme caramélisée façon tatin",
    ingredient: ingredient("2", "pommes", "en quartiers"),
    step: "les quartiers de pomme caramélisés",
    cookTime: 10,
    calories: 120,
  },
  {
    id: "poire-amande",
    title: "poire aux amandes",
    ingredient: ingredient("2", "poires", "en lamelles"),
    extraIngredients: [ingredient("30 g", "d'amandes effilées")],
    step: "les lamelles de poire et d'amandes",
    cookTime: 9,
    calories: 130,
  },
  {
    id: "abricot-miel",
    title: "abricots rôtis au miel",
    ingredient: ingredient("6", "abricots", "dénoyautés"),
    step: "les abricots nappés de miel",
    cookTime: 8,
    calories: 110,
  },
  {
    id: "fraise-menthe",
    title: "fraises à la menthe",
    ingredient: ingredient("250 g", "de fraises", "équeutées"),
    step: "les fraises parfumées à la menthe",
    cookTime: 0,
    calories: 95,
  },
  {
    id: "peche-verveine",
    title: "pêches à la verveine",
    ingredient: ingredient("3", "pêches", "en quartiers"),
    step: "les quartiers de pêche infusés à la verveine",
    cookTime: 6,
    calories: 100,
  },
  {
    id: "banane-flambee",
    title: "bananes flambées",
    ingredient: ingredient("2", "bananes", "coupées en deux"),
    extraIngredients: [ingredient("1 c. à s.", "de rhum ambré")],
    step: "les bananes légèrement flambées",
    cookTime: 7,
    calories: 150,
  },
  {
    id: "prune-cannelle",
    title: "prunes à la cannelle",
    ingredient: ingredient("8", "prunes", "coupées en deux"),
    step: "les prunes saupoudrées de cannelle",
    cookTime: 9,
    calories: 110,
  },
  {
    id: "raisin-roti",
    title: "raisins rôtis",
    ingredient: ingredient("250 g", "de raisins", "en grappes"),
    step: "les raisins rôtis",
    cookTime: 8,
    calories: 105,
  },
  {
    id: "orange-miel",
    title: "oranges au miel",
    ingredient: ingredient("3", "oranges", "en suprêmes"),
    step: "les suprêmes d'orange au miel",
    cookTime: 0,
    calories: 90,
  },
  {
    id: "myrtille-lavande",
    title: "myrtilles à la lavande",
    ingredient: ingredient("200 g", "de myrtilles"),
    step: "les myrtilles tièdes à la lavande",
    cookTime: 5,
    calories: 95,
  },
  {
    id: "cerise-pistache",
    title: "cerises et pistaches",
    ingredient: ingredient("200 g", "de cerises", "dénoyautées"),
    extraIngredients: [ingredient("20 g", "de pistaches concassées")],
    step: "les cerises et pistaches croquantes",
    cookTime: 6,
    calories: 130,
  },
  {
    id: "coing-epices",
    title: "coings aux épices",
    ingredient: ingredient("2", "coings", "en quartiers"),
    extraIngredients: [ingredient("1", "bâton de cannelle")],
    step: "les coings doucement épicés",
    cookTime: 12,
    calories: 140,
  },
];

const DESSERT_FINISHES = [
  { id: "creme-fouettee", garnish: "une cuillerée de crème fouettée", calories: 70 },
  { id: "yaourt", garnish: "un nuage de yaourt grec", calories: 60 },
  { id: "granola", garnish: "du granola croustillant", calories: 80 },
  { id: "menthe", garnish: "quelques feuilles de menthe", calories: 5 },
  { id: "amandes", garnish: "des amandes torréfiées", calories: 60 },
  { id: "sablés", garnish: "des brisures de sablés", calories: 90 },
];


function cleanTitlePart(text) {
  return text
    .replace(/^avec\s+/i, "")
    .replace(/^accompagné de\s+/i, "")
    .replace(/^servi avec\s+/i, "")
    .replace(/^posé sur\s+/i, "")
    .replace(/^sur\s+/i, "")
    .replace(/^avec un\s+/i, "un ")
    .replace(/^avec une\s+/i, "une ")
    .replace(/^avec des\s+/i, "des ")
    .replace(/^avec le\s+/i, "le ")
    .replace(/^avec la\s+/i, "la ")
    .trim();
}

function createSaladRecipe(veg, protein) {
  return {
    id: `salade-${veg.id}-${protein.id}`,
    title: `Salade de ${veg.title} et ${protein.title}`,
    category: "Entrée fraîche",
    prepTime: 8 + veg.prep + protein.prep,
    cookTime: 0,
    calories: 110 + veg.calories + protein.calories,
    ingredients: [
      ...cloneList(SALAD_BASE_INGREDIENTS),
      cloneIngredient(veg.ingredient),
      ...cloneList(veg.extraIngredients || []),
      cloneIngredient(protein.ingredient),
      ...cloneList(protein.extraIngredients || []),
    ],
    steps: [
      "Rincez et essorez les jeunes pousses puis disposez-les dans un grand saladier.",
      `Ajoutez ${veg.step} et mélangez délicatement.`,
      `Incorporez ${protein.step} puis assaisonnez avant de terminer par ${
        protein.garnish || veg.garnish || "quelques herbes fraîches"
      }.`,
    ],
  };
}

const SALAD_RECIPES = SALAD_VEGETABLES.flatMap((veg) =>
  SALAD_PROTEINS.map((protein) => createSaladRecipe(veg, protein))
);

function createSoupRecipe(base, finish) {
  const finishTitle = cleanTitlePart(finish.garnish || "une touche gourmande");
  return {
    id: `soupe-${base.id}-${finish.id}`,
    title: `${base.title} et ${finishTitle}`,
    category: "Soupe réconfortante",
    prepTime: 10 + Math.round(base.cookTime / 6),
    cookTime: base.cookTime,
    calories: 90 + base.calories + finish.calories,
    ingredients: [
      ...cloneList(SOUP_BASE_INGREDIENTS),
      cloneIngredient(base.ingredient),
      ...cloneList(base.extraIngredients || []),
      ingredient("Pour servir", finish.garnish),
    ],
    steps: [
      "Faites revenir l'oignon et l'ail dans le beurre jusqu'à ce qu'ils deviennent translucides.",
      `Ajoutez ${base.step} puis versez le bouillon et laissez mijoter ${base.cookTime} minutes avec le laurier.`,
      `Mixez ou écrasez selon la texture souhaitée et servez avec ${finish.garnish}.`,
    ],
  };
}

const SOUP_RECIPES = SOUP_VEGETABLES.flatMap((base) =>
  SOUP_FINISHES.map((finish) => createSoupRecipe(base, finish))
);

function createSkilletRecipe(veg, protein) {
  const finishTitle = cleanTitlePart(protein.garnish || "une touche d'herbes");
  return {
    id: `poelee-${veg.id}-${protein.id}`,
    title: `Poêlée ${veg.title} et ${finishTitle}`,
    category: "Poêlée rapide",
    prepTime: 10 + Math.round(veg.cookTime / 4),
    cookTime: veg.cookTime + protein.cookTime,
    calories: 140 + veg.calories + protein.calories,
    ingredients: [
      ...cloneList(SKILLET_BASE_INGREDIENTS),
      cloneIngredient(veg.ingredient),
      ...cloneList(veg.extraIngredients || []),
      cloneIngredient(protein.ingredient),
    ],
    steps: [
      "Chauffez l'huile avec l'oignon et l'ail dans une grande poêle.",
      `Faites sauter ${veg.step} jusqu'à tendreté en remuant régulièrement.`,
      `Ajoutez ${protein.step}, poursuivez la cuisson et terminez par ${protein.garnish}.`,
    ],
  };
}

const SKILLET_RECIPES = SKILLET_VEGETABLES.flatMap((veg) =>
  SKILLET_PROTEINS.map((protein) => createSkilletRecipe(veg, protein))
);

function createPastaRecipe(sauce, finish) {
  const finishTitle = cleanTitlePart(finish.garnish || "une touche aromatique");
  return {
    id: `pates-${sauce.id}-${finish.id}`,
    title: `${sauce.title} et ${finishTitle}`,
    category: "Pâtes express",
    prepTime: 12,
    cookTime: 10 + sauce.cookTime,
    calories: 200 + sauce.calories + finish.calories,
    ingredients: [
      ...cloneList(PASTA_BASE_INGREDIENTS),
      cloneIngredient(sauce.ingredient),
      ...cloneList(sauce.extraIngredients || []),
      ingredient("Pour finir", finish.garnish),
    ],
    steps: [
      "Faites cuire les pâtes dans un grand volume d'eau salée.",
      `Dans une sauteuse, préparez la garniture : ${sauce.step}.`,
      `Égouttez les pâtes, mélangez-les à la sauce et parsemez de ${finish.garnish}.`,
    ],
  };
}

const PASTA_RECIPES = PASTA_SAUCES.flatMap((sauce) =>
  PASTA_FINISHES.map((finish) => createPastaRecipe(sauce, finish))
);

function createGratinRecipe(base, topping) {
  const finishTitle = cleanTitlePart(topping.garnish || "un gratin doré");
  return {
    id: `gratin-${base.id}-${topping.id}`,
    title: `${base.title} ${finishTitle}`,
    category: "Gratin au four",
    prepTime: 15,
    cookTime: base.cookTime + 10,
    calories: 220 + base.calories + topping.calories,
    ingredients: [
      ...cloneList(GRATIN_BASE_INGREDIENTS),
      cloneIngredient(base.ingredient),
      ingredient("Pour gratiner", topping.garnish),
    ],
    steps: [
      "Préchauffez le four à 190 °C et frottez le plat avec la gousse d'ail.",
      `Disposez ${base.step} en couches régulières et nappez de crème.`,
      `Parsemez de fromage et de ${topping.garnish} avant d'enfourner jusqu'à ce que le gratin soit doré.`,
    ],
  };
}

const GRATIN_RECIPES = GRATIN_VEGETABLES.flatMap((base) =>
  GRATIN_TOPPINGS.map((topping) => createGratinRecipe(base, topping))
);

function createPoultryRecipe(marinade, finish) {
  const finishTitle = cleanTitlePart(finish.garnish || "un accompagnement gourmand");
  return {
    id: `poulet-${marinade.id}-${finish.id}`,
    title: `${marinade.title} et ${finishTitle}`,
    category: "Volaille mijotée",
    prepTime: 20,
    cookTime: marinade.cookTime,
    calories: 280 + marinade.calories + finish.calories,
    ingredients: [
      ...cloneList(POULTRY_BASE_INGREDIENTS),
      ...cloneList(marinade.extraIngredients || []),
      ingredient("Pour servir", finish.garnish),
    ],
    steps: [
      `Massez les cuisses de poulet avec l'huile, l'ail et ${marinade.step} puis laissez reposer quelques minutes.`,
      "Saisissez le poulet côté peau puis enfournez ou laissez mijoter jusqu'à cuisson complète.",
      `Servez bien chaud ${finish.garnish}.`,
    ],
  };
}

const POULTRY_RECIPES = POULTRY_MARINADES.flatMap((marinade) =>
  POULTRY_FINISHES.map((finish) => createPoultryRecipe(marinade, finish))
);

function createFishRecipe(marinade, finish) {
  const finishTitle = cleanTitlePart(finish.garnish || "une garniture fraîche");
  return {
    id: `poisson-${marinade.id}-${finish.id}`,
    title: `${marinade.title} et ${finishTitle}`,
    category: "Poisson délicat",
    prepTime: 15,
    cookTime: marinade.cookTime,
    calories: 220 + marinade.calories + finish.calories,
    ingredients: [
      ...cloneList(FISH_BASE_INGREDIENTS),
      ...cloneList(marinade.extraIngredients || []),
      ingredient("Pour servir", finish.garnish),
    ],
    steps: [
      `Disposez les filets dans un plat et nappez-les avec la marinade ${marinade.step}.`,
      "Faites cuire doucement au four ou à la poêle jusqu'à ce que la chair soit nacrée.",
      `Présentez ${finish.garnish} pour compléter le plat.`,
    ],
  };
}

const FISH_RECIPES = FISH_MARINADES.flatMap((marinade) =>
  FISH_FINISHES.map((finish) => createFishRecipe(marinade, finish))
);

function createOmeletteRecipe(filling, finish) {
  const finishTitle = cleanTitlePart(finish.garnish || "quelques herbes");
  return {
    id: `omelette-${filling.id}-${finish.id}`,
    title: `Omelette ${filling.id.replace(/-/g, " ")} et ${finishTitle}`,
    category: "Omelette minute",
    prepTime: 6 + filling.prep,
    cookTime: 6 + Math.round(filling.prep / 2),
    calories: 180 + filling.calories + finish.calories,
    ingredients: [
      ...cloneList(OMELETTE_BASE_INGREDIENTS),
      cloneIngredient(filling.ingredient),
      ...cloneList(filling.extraIngredients || []),
      ingredient("Pour servir", finish.garnish),
    ],
    steps: [
      "Battez les œufs avec une pincée de sel et de poivre.",
      `Faites revenir ${filling.step} puis versez les œufs battus.`,
      `Pliez l'omelette encore baveuse et terminez avec ${finish.garnish}.`,
    ],
  };
}

const OMELETTE_RECIPES = OMELETTE_FILLINGS.flatMap((filling) =>
  OMELETTE_FINISHES.map((finish) => createOmeletteRecipe(filling, finish))
);

function createRiceRecipe(mix, topping) {
  const finishTitle = cleanTitlePart(topping.garnish || "une belle garniture");
  return {
    id: `riz-${mix.id}-${topping.id}`,
    title: `Riz parfumé ${mix.id.replace(/-/g, " ")} et ${finishTitle}`,
    category: "Bol complet",
    prepTime: 10,
    cookTime: 18 + mix.cookTime,
    calories: 180 + mix.calories + topping.calories,
    ingredients: [
      ...cloneList(RICE_BASE_INGREDIENTS),
      cloneIngredient(mix.ingredient),
      ...cloneList(mix.extraIngredients || []),
      ingredient("Pour garnir", topping.garnish),
    ],
    steps: [
      "Faites revenir l'échalote dans un filet d'huile puis ajoutez le riz et nacrez-le.",
      `Versez l'eau, ajoutez le laurier et incorporez ${mix.step} pendant la cuisson.`,
      `Servez le riz et complétez avec ${topping.garnish}.`,
    ],
  };
}

const RICE_RECIPES = RICE_MIXES.flatMap((mix) =>
  RICE_TOPPINGS.map((topping) => createRiceRecipe(mix, topping))
);

function createDessertRecipe(fruit, finish) {
  const finishTitle = cleanTitlePart(finish.garnish || "une touche douce");
  return {
    id: `dessert-${fruit.id}-${finish.id}`,
    title: `${fruit.title} et ${finishTitle}`,
    category: "Dessert léger",
    prepTime: 8,
    cookTime: fruit.cookTime,
    calories: 160 + fruit.calories + finish.calories,
    ingredients: [
      ...cloneList(DESSERT_BASE_INGREDIENTS),
      cloneIngredient(fruit.ingredient),
      ...cloneList(fruit.extraIngredients || []),
      ingredient("Pour servir", finish.garnish),
    ],
    steps: [
      `Faites fondre le beurre avec le sucre et la vanille, puis ajoutez ${fruit.step}.`,
      fruit.cookTime
        ? `Laissez cuire ${fruit.cookTime} minutes en remuant délicatement.`
        : "Laissez simplement mariner les fruits dans le sirop parfumé.",
      `Servez tiède ou frais avec ${finish.garnish}.`,
    ],
  };
}

const DESSERT_RECIPES = DESSERT_FRUITS.flatMap((fruit) =>
  DESSERT_FINISHES.map((finish) => createDessertRecipe(fruit, finish))
);


const ALL_RECIPES = [
  ...SALAD_RECIPES,
  ...SOUP_RECIPES,
  ...SKILLET_RECIPES,
  ...PASTA_RECIPES,
  ...GRATIN_RECIPES,
  ...POULTRY_RECIPES,
  ...FISH_RECIPES,
  ...OMELETTE_RECIPES,
  ...RICE_RECIPES,
  ...DESSERT_RECIPES,
];

export const RECIPE_DATA = Object.freeze(
  ALL_RECIPES.map((recipe) =>
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

