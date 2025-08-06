'use client';
import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { KanbanData, Task, Column } from '@/lib/types';
import { reorder, generateId } from '@/lib/utils';
import KanbanColumn from './KanbanColumn';

const initialData: KanbanData = {
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: generateId(),
          title: 'Setup project structure',
          description: 'Create the basic folder structure and install dependencies',
          createdAt: new Date(),
          priority: 1,
          image: '/placeholder-avatar.webp',
        },
        {
          id: generateId(),
          title: 'Design database schema',
          createdAt: new Date(),
          priority: 0,
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        {
          id: generateId(),
          title: 'Implement user authentication',
          description: 'Add login and registration functionality',
          createdAt: new Date(),
          priority: 1,
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        {
          id: generateId(),
          title: 'Initial project setup',
          createdAt: new Date(),
          priority: 0,
        },
      ],
    },
  ],
};

export function KanbanBoard() {
  const [data, setData] = useLocalStorage<KanbanData>('kanban-data', initialData);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns.find(col => col.id === source.droppableId)!;
    const finish = data.columns.find(col => col.id === destination.droppableId)!;

    if (start === finish) {
      // Reordering within the same column
      const newTasks = reorder(start.tasks, source.index, destination.index);
      const newColumn: Column = {
        ...start,
        tasks: newTasks,
      };

      const newData = {
        ...data,
        columns: data.columns.map(col =>
          col.id === newColumn.id ? newColumn : col
        ),
      };

      setData(newData);
      return;
    }

    // Moving from one column to another
    const startTasks = Array.from(start.tasks);
    const [movedTask] = startTasks.splice(source.index, 1);

    const newStart: Column = {
      ...start,
      tasks: startTasks,
    };

    const finishTasks = Array.from(finish.tasks);
    finishTasks.splice(destination.index, 0, movedTask);
    const newFinish: Column = {
      ...finish,
      tasks: finishTasks,
    };

    const newData = {
      ...data,
      columns: data.columns.map(col => {
        if (col.id === newStart.id) return newStart;
        if (col.id === newFinish.id) return newFinish;
        return col;
      }),
    };

    setData(newData);
  };

  return (
    <div className="h-screen">
      <div className="max-w-full mx-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
            {data.columns.map(column => (
              <div key={column.id} className="flex-1 min-w-0 md:min-w-[300px]">
                <KanbanColumn
                  column={column}
                />
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}