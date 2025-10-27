import { CSSProperties } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableMealCardProps {
  id: string;
  title: string;
  subtitle?: string;
}

export const DraggableMealCard = ({ id, title, subtitle }: DraggableMealCardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style: CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {};

  return (
    <article
      ref={setNodeRef}
      className={`meal-card btn-touch${isDragging ? ' drag-active' : ''}`}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="meal-card-body">
        <h3 className="meal-card-title">{title}</h3>
        {subtitle ? <p className="meal-card-subtitle">{subtitle}</p> : null}
        <p className="meal-card-hint">Appui long pour déplacer</p>
      </div>
    </article>
  );
};
