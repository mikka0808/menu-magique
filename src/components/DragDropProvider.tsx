import { ReactNode } from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

interface DragDropProviderProps {
  children: ReactNode;
  onDragEnd?: (event: DragEndEvent) => void;
}

export const DragDropProvider = ({ children, onDragEnd }: DragDropProviderProps) => {
  const sensors = useSensors(
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 6,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 4,
      },
    })
  );

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd} autoScroll={false}>
      {children}
    </DndContext>
  );
};
