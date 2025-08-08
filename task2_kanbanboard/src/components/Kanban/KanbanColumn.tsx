import { Column, Task } from "@/types/kanban.types";
import { Droppable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import KanbanCard from "./KanbanCard/KanbanCard";
import { RiCircleFill } from "react-icons/ri";
import PurpleIcons from "../layout/Main/Header/PurpleIcons";
import { BiPlus } from "react-icons/bi";

type KanbanColumnProps = {
  column: Column;
};

function KanbanColumn({ column }: KanbanColumnProps) {
  const color =
    column.id === "todo"
      ? "#5030E5"
      : column.id === "in-progress"
      ? "#FFA500"
      : "#8BC48A";

  return (
    <div className="bg-gray-50 rounded-lg p-4 w-full">
      <div className="flex items-center mb-4 justify-between">
        <div className="flex items-center gap-3">
          <RiCircleFill color={color} className="h-[8px] w-[8px]" />
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <span className="bg-gray-200 text-gray-700 text-xs rounded-full text-center flex items-center justify-center w-[20px] h-[20px]">
            {column.tasks.length}
          </span>
        </div>
        <div>
          <PurpleIcons boxSize={20} icon={BiPlus} size={9.5}/>
        </div>
      </div>
      <span className={`block h-[2px] mb-4`} style={{ backgroundColor: color }}></span>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] ${
              snapshot.isDraggingOver
                ? "bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg"
                : ""
            }`}
          >
            {column.tasks.map((task, index) => (
              <KanbanCard
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default KanbanColumn;