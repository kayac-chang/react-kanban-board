import { Column, Task } from "./components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { cond, identity, insert, map, move, propEq, remove, T } from "ramda";
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
    {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
    {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  ],
  columnOrder: ["column-1", "column-2", "column-3"],
};

function App() {
  const { columnOrder, tasks } = initialData;

  const [columns, setColumns] = useState(initialData.columns);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) return;

    const column = columns.find(propEq("id", source.droppableId));
    if (!column) return;

    setColumns(
      map(
        cond([
          [
            () => source.droppableId === destination.droppableId,
            (col) => ({
              ...col,
              taskIds: move(source.index, destination.index, col.taskIds),
            }),
          ],
          [
            (col) => col.id === source.droppableId,
            (col) => ({
              ...col,
              taskIds: remove(source.index, 1, col.taskIds),
            }),
          ],
          [
            (col) => col.id === destination.droppableId,
            (col) => ({
              ...col,
              taskIds: insert(
                destination.index,
                column.taskIds[source.index],
                col.taskIds
              ),
            }),
          ],
          [T, identity],
        ])
      )
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full h-full p-2 flex">
        {columnOrder
          .map((id) => columns.find(propEq("id", id)))
          .map(
            (column) =>
              column && (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  className="w-60"
                >
                  {column.taskIds
                    .map((id) => tasks.find(propEq("id", id)))
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
