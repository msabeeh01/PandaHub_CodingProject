import { Draggable } from "@hello-pangea/dnd";

type Props = {
  task: { id: string; title: string };
  index: number;
};

export default function KanbanTask({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 rounded-md bg-white shadow border
                      text-gray-700 text-sm
                      ${snapshot.isDragging ? "shadow-lg" : ""}`}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
}
