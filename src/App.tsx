import { Column, Task } from "./components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
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
  const { tasks } = initialData;

  const [columnOrder, setColumnOrder] = useState(initialData.columnOrder);
  const [columns, setColumns] = useState(initialData.columns);

  function onDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "Column") {
      setColumnOrder(move(source.index, destination.index));

      return;
    }

    const target = columns.find(propEq("id", source.droppableId))?.taskIds[
      source.index
    ];

    if (!target) return;

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
              taskIds: insert(destination.index, target, col.taskIds),
            }),
          ],
          [T, identity],
        ])
      )
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="root" direction="horizontal" type="Column">
        {({ innerRef, droppableProps, placeholder }) => (
          <div
            className="w-full h-full p-2 flex gap-4 "
            ref={innerRef}
            {...droppableProps}
          >
            {columnOrder
              .map((id) => columns.find(propEq("id", id)))
              .map(
                (column, index) =>
                  column && (
                    <Column
                      key={column.id}
                      id={column.id}
                      index={index}
                      title={
                        <h3 className="bg-blue text-white text-center py-1">
                          {column.title}
                        </h3>
                      }
                      className="w-80 rounded overflow-hidden bg-gray-fill shadow"
                      containerClassName="py-4 px-2 space-y-4"
                    >
                      {column.taskIds
                        .map((id) => tasks.find(propEq("id", id)))
                        .map(
                          (task, index) =>
                            task && (
                              <Task
                                key={task.id}
                                index={index}
                                className="bg-white rounded shadow-md"
                                {...task}
                              />
                            )
                        )}
                    </Column>
                  )
              )}

            {placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
