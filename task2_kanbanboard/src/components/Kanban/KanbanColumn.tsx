import { Droppable } from "@hello-pangea/dnd";
import KanbanTask from "./KanbanTask";

type Props = {
  column: { id: string; title: string; taskIds: string[] };
  tasks: { id: string; title: string }[];
};

export default function KanbanColumn({ column, tasks }: Props) {
  return (
    <div className="bg-gray-50 rounded-lg w-64 flex-shrink-0 p-4">
      <h2 className="font-semibold text-gray-800 mb-4">{column.title}</h2>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[100px] rounded transition-colors ${
              snapshot.isDraggingOver ? "bg-purple-50" : ""
            }`}
          >
            {tasks.map((task, index) => (
              <KanbanTask key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
