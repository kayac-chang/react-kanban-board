import { Column, Task } from "./components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { move, propEq } from "ramda";
import { useState } from "react";

const initialData = {
  tasks: [
    { id: "task-1", content: "Take out the garbage" },
    { id: "task-2", content: "Watch my favorite show" },
    { id: "task-3", content: "Charge my phone" },
    { id: "task-4", content: "Cook dinner" },
  ],
  columns: [
    {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  ],
  columnOrder: ["column-1"],
};

function App() {
  const { columnOrder, tasks } = initialData;

  const [columns, setColumns] = useState(initialData.columns);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) return;

    setColumns(
      columns.map((column) =>
        column.id === destination.droppableId
          ? {
              ...column,
              taskIds: move(source.index, destination.index, column.taskIds),
            }
          : column
      )
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full h-full p-2">
        {columnOrder
          .map((id) => columns.find((col) => id === col.id))
          .map(
            (column) =>
              column && (
                <Column key={column.id} id={column.id} title={column.title}>
                  {column.taskIds
                    .map((id) => tasks.find((task) => task.id === id))
                    .map(
                      (task, index) =>
                        task && <Task key={task.id} index={index} {...task} />
                    )}
                </Column>
              )
          )}
      </div>
    </DragDropContext>
  );
}

export default App;
