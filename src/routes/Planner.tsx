import { DragEndEvent } from '@dnd-kit/core';
import { useMemo } from 'react';
import { DragDropProvider } from '../components/DragDropProvider';
import { DraggableMealCard } from '../components/DraggableMealCard';
import {
  DayKey,
  PlannerGrid,
  SlotKey,
} from '../components/PlannerGrid';
import { usePlannerStore } from '../store/plannerStore';

const parseCellId = (id: string): { day: DayKey; slot: SlotKey } | null => {
  const [rawDay, rawSlot] = id.split('-');
  const day = rawDay as DayKey | undefined;
  const slot = rawSlot as SlotKey | undefined;

  if (!day || !slot) {
    return null;
  }

  return { day, slot };
};

const extractRecipeId = (activeId: string): string | null => {
  if (activeId.startsWith('library-')) {
    return activeId.replace(/^library-/, '');
  }

  const [, , ...rest] = activeId.split('-');
  if (rest.length === 0) {
    return null;
  }

  return rest.join('-');
};

const recipeAlreadyUsed = (
  meals: ReturnType<typeof usePlannerStore>['meals'],
  recipeId: string
) => {
  return Object.values(meals).some((dayMeals) =>
    Object.values(dayMeals).some((value) => value === recipeId)
  );
};

export const Planner = () => {
  const store = usePlannerStore();

  const availableFallbackRecipe = useMemo(() => {
    return store.recipes.find((recipe) => !recipeAlreadyUsed(store.meals, recipe.id)) ??
      store.recipes[0];
  }, [store.recipes, store.meals]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const target = parseCellId(String(over.id));
    if (!target) {
      return;
    }

    const recipeId = extractRecipeId(String(active.id));
    if (!recipeId) {
      return;
    }

    store.setMealByRecipeId(target.day, target.slot, recipeId);
  };

  const handleAddMeal = (day: DayKey, slot: SlotKey) => {
    if (!availableFallbackRecipe) {
      return;
    }

    store.setMealByRecipeId(day, slot, availableFallbackRecipe.id);
  };

  return (
    <div className="planner-page">
      <header className="planner-header">
        <div>
          <h1>Menu Magique</h1>
          <p>Planifiez vos repas en mode mobile avec le glisser-déposer.</p>
        </div>
      </header>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="planner-layout">
          <section className="planner-board">
            <PlannerGrid
              meals={store.meals}
              recipesById={store.recipesById}
              onAddMeal={handleAddMeal}
            />
          </section>
          <aside className="planner-library">
            <h2>Suggestions rapides</h2>
            <p className="planner-library-hint">
              Appuyez longuement sur une carte pour la glisser dans le planning.
            </p>
            <div className="planner-library-grid">
              {store.recipes.map((recipe) => (
                <DraggableMealCard
                  key={recipe.id}
                  id={`library-${recipe.id}`}
                  title={recipe.title}
                  subtitle={recipe.description}
                />
              ))}
            </div>
          </aside>
        </div>
      </DragDropProvider>
    </div>
  );
};
