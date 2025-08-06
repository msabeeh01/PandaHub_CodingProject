import { create } from "zustand";

export type Task = { id: string; title: string };
export type Column = { id: string; title: string; taskIds: string[] };

export type BoardData = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};

const initialData: BoardData = {
  tasks: {
    "task-1": { id: "task-1", title: "Design login page" },
    "task-2": { id: "task-2", title: "Fix sidebar responsiveness" },
    "task-3": { id: "task-3", title: "Implement drag and drop" },
  },
  columns: {
    "column-1": { id: "column-1", title: "To Do", taskIds: ["task-1", "task-2"] },
    "column-2": { id: "column-2", title: "In Progress", taskIds: ["task-3"] },
    "column-3": { id: "column-3", title: "Done", taskIds: [] },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

type KanbanStore = {
  board: BoardData;
  moveTask: (
    draggableId: string,
    sourceColId: string,
    destColId: string,
    sourceIndex: number,
    destIndex: number
  ) => void;
};

export const useKanbanStore = create<KanbanStore>((set) => ({
  board: initialData,

  moveTask: (draggableId, sourceColId, destColId, sourceIndex, destIndex) =>
    set((state) => {
      const board = { ...state.board };
      const startCol = board.columns[sourceColId];
      const endCol = board.columns[destColId];

      // Moving within the same column
      if (startCol === endCol) {
        const newTaskIds = Array.from(startCol.taskIds);
        newTaskIds.splice(sourceIndex, 1);
        newTaskIds.splice(destIndex, 0, draggableId);

        board.columns[startCol.id] = { ...startCol, taskIds: newTaskIds };
        return { board };
      }

      // Moving to a different column
      const startTaskIds = Array.from(startCol.taskIds);
      startTaskIds.splice(sourceIndex, 1);

      const endTaskIds = Array.from(endCol.taskIds);
      endTaskIds.splice(destIndex, 0, draggableId);

      board.columns[startCol.id] = { ...startCol, taskIds: startTaskIds };
      board.columns[endCol.id] = { ...endCol, taskIds: endTaskIds };

      return { board };
    }),
}));
