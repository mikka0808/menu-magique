import { useCallback, useMemo, useState } from 'react';
import type { DayKey, RecipeSummary, SlotKey } from '../components/PlannerGrid';

const DEFAULT_RECIPES: RecipeSummary[] = [
  { id: 'salade-cesar', title: 'Salade César au poulet' },
  { id: 'quiche-poireaux', title: 'Quiche aux poireaux' },
  { id: 'pates-pesto', title: 'Pâtes au pesto maison' },
  { id: 'curry-pois-chiches', title: 'Curry de pois chiches', description: 'Velouté coco & épices' },
  { id: 'saumon-teriyaki', title: 'Saumon teriyaki et riz' },
  { id: 'pad-thai', title: 'Pad thaï aux crevettes' },
  { id: 'wok-legumes', title: 'Wok de légumes croquants' },
  { id: 'poulet-roti', title: 'Poulet rôti et légumes racines' },
  { id: 'soupe-thai', title: 'Soupe thaï coco' },
  { id: 'buddha-bowl', title: 'Buddha bowl quinoa & tofu' },
  { id: 'tacos-boeuf', title: 'Tacos au bœuf effiloché' },
  { id: 'lasagnes-legumes', title: 'Lasagnes aux légumes' },
  { id: 'boulettes-suedoises', title: 'Boulettes suédoises et purée' },
  { id: 'poke-thon', title: 'Poke bowl au thon' },
  { id: 'risotto-champignons', title: 'Risotto aux champignons' },
  { id: 'omelette-herbes', title: 'Omelette aux herbes fraîches' },
  { id: 'boeuf-bourguignon', title: 'Bœuf bourguignon express' },
  { id: 'chili-sin-carne', title: 'Chili sin carne' },
  { id: 'galettes-sarrasin', title: 'Galettes de sarrasin complètes' },
  { id: 'poisson-papillote', title: 'Poisson en papillote citronné' },
];

const DAYS: DayKey[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const SLOTS: SlotKey[] = ['lunch', 'dinner'];

type PlannerMeals = Record<DayKey, Record<SlotKey, string | null>>;

const createEmptyMeals = (): PlannerMeals => {
  return DAYS.reduce((acc, day) => {
    acc[day] = SLOTS.reduce((slotAcc, slot) => {
      slotAcc[slot] = null;
      return slotAcc;
    }, {} as Record<SlotKey, string | null>);
    return acc;
  }, {} as PlannerMeals);
};

export const usePlannerStore = () => {
  const [meals, setMeals] = useState<PlannerMeals>(() => createEmptyMeals());
  const [recipes] = useState<RecipeSummary[]>(DEFAULT_RECIPES);

  const recipesById = useMemo(() => {
    return recipes.reduce<Record<string, RecipeSummary>>((acc, recipe) => {
      acc[recipe.id] = recipe;
      return acc;
    }, {});
  }, [recipes]);

  const setMealByRecipeId = useCallback(
    (day: DayKey, slot: SlotKey, recipeId: string) => {
      if (!recipesById[recipeId]) {
        return;
      }

      setMeals((prev) => {
        const next: PlannerMeals = { ...prev };

        for (const dayKey of DAYS) {
          const current = next[dayKey];
          for (const slotKey of SLOTS) {
            if (current[slotKey] === recipeId) {
              next[dayKey] = { ...current, [slotKey]: null };
            }
          }
        }

        next[day] = { ...next[day], [slot]: recipeId };
        return next;
      });
    },
    [recipesById]
  );

  const clearMeal = useCallback((day: DayKey, slot: SlotKey) => {
    setMeals((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: null,
      },
    }));
  }, []);

  return {
    meals,
    recipes,
    recipesById,
    setMealByRecipeId,
    clearMeal,
  };
};
