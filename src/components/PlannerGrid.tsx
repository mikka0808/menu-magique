import { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DraggableMealCard } from './DraggableMealCard';

export type DayKey =
  | 'lundi'
  | 'mardi'
  | 'mercredi'
  | 'jeudi'
  | 'vendredi'
  | 'samedi'
  | 'dimanche';

export type SlotKey = 'lunch' | 'dinner';

export interface RecipeSummary {
  id: string;
  title: string;
  description?: string;
}

export interface PlannerGridProps {
  meals: Record<DayKey, Record<SlotKey, string | null>>;
  recipesById: Record<string, RecipeSummary>;
  onAddMeal?: (day: DayKey, slot: SlotKey) => void;
}

const DAYS: { key: DayKey; label: string }[] = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
];

const SLOTS: { key: SlotKey; label: string }[] = [
  { key: 'lunch', label: 'Midi' },
  { key: 'dinner', label: 'Soir' },
];

const DroppableCell = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className={`planner-cell${isOver ? ' drag-active' : ''}`}>
      {children}
    </div>
  );
};

export const PlannerGrid = ({ meals, recipesById, onAddMeal }: PlannerGridProps) => {
  return (
    <section className="planner-grid" aria-label="Planning hebdomadaire des repas">
      <div className="planner-grid-header">
        <div className="planner-grid-label" aria-hidden="true"></div>
        {SLOTS.map((slot) => (
          <div key={slot.key} className="planner-grid-label">
            {slot.label}
          </div>
        ))}
      </div>
      {DAYS.map((day) => (
        <div key={day.key} className="planner-grid-row">
          <div className="planner-grid-day" aria-label={day.label}>
            <span>{day.label}</span>
          </div>
          {SLOTS.map((slot) => {
            const cellId = `${day.key}-${slot.key}`;
            const recipeId = meals[day.key][slot.key];
            const recipe = recipeId ? recipesById[recipeId] : undefined;

            return (
              <DroppableCell key={slot.key} id={cellId}>
                {recipe ? (
                  <DraggableMealCard
                    id={`${cellId}-${recipe.id}`}
                    title={recipe.title}
                    subtitle={recipe.description}
                  />
                ) : (
                  <button
                    type="button"
                    className="add-meal-button btn-touch"
                    onClick={() => onAddMeal?.(day.key, slot.key)}
                  >
                    Ajouter
                  </button>
                )}
              </DroppableCell>
            );
          })}
        </div>
      ))}
    </section>
  );
};
