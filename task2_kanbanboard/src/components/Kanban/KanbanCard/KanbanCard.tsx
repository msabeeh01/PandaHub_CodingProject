import AvatarGroup from "@/components/AvatarGroup/AvatarGroup";
import { Task } from "@/lib/types";
import { Draggable } from "@hello-pangea/dnd";
import { MdMore, MdMoreHoriz } from "react-icons/md";

interface KanbanCardProps {
  task: Task;
  index: number;
  columnId: string;
}

export default function KanbanCard({ task, index, columnId }: KanbanCardProps) {
  const priorityText: { [key: number]: string } = {
    0: "Low",
    1: "High",
    2: "Completed",
  };

  // Determine priority based on column or task priority
  const getEffectivePriority = (): number => {
    // If task is in the 'done' column, always show as completed
    if (columnId === "done") {
      return 2; // Completed
    }
    // Otherwise use the task's priority or default to 0 (Low)
    return task.priority ?? 0;
  };

  const effectivePriority = getEffectivePriority();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white p-3 rounded-2xl mb-2 cursor-grab active:cursor-grabbing ${
            snapshot.isDragging
              ? "shadow-lg transform rotate-2"
              : "hover:shadow-md"
          }`}
        >
          <div className="flex justify-between items-center">
            <div
              className={`text-xs font-semibold mb-2 px-2 py-1 rounded-sm inline-block ${
                effectivePriority === 2
                  ? "bg-[rgba(131_194_157_/_0.2)] text-[#68B266]"
                  : effectivePriority === 1
                  ? "bg-[rgba(216_114_125_/_0.1)] text-[#D8727D]"
                  : "bg-[rgba(223_168_116_/_0.2)] text-[#D58D49]"
              }`}
            >
              {priorityText[effectivePriority] || "No priority"}
            </div>

            <div>
              <MdMoreHoriz />
            </div>
          </div>

          <h4 className="font-medium text-gray-900 mb-1">{task.title}</h4>
          {task.image ? (
<div className="bg-gray-400 mb-2 w-full h-[240px] rounded-lg" />
          ) : (
<p className="text-sm text-gray-600">{task.description}</p>
          )}
          <div className="mt-7">
            <AvatarGroup size={24} max={3} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
