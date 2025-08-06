"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useKanbanStore } from "@/store/kanbanStore";
import KanbanColumn from "./KanbanColumn";

export default function KanbanBoard() {
  const { board, moveTask } = useKanbanStore();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // No change
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTask(
      draggableId,
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto">
        {board.columnOrder.map((colId) => {
          const column = board.columns[colId];
          const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);
          return <KanbanColumn key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
}
