import { Column, Task } from "./components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { cond, identity, insert, map, move, propEq, remove, T } from "ramda";
import { useState } from "react";
import initialData from "./mocks/board";

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

    const target = columns.find(propEq("id", source.droppableId))?.taskIDs[
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
              taskIDs: move(source.index, destination.index, col.taskIDs),
            }),
          ],
          [
            (col) => col.id === source.droppableId,
            (col) => ({
              ...col,
              taskIDs: remove(source.index, 1, col.taskIDs),
            }),
          ],
          [
            (col) => col.id === destination.droppableId,
            (col) => ({
              ...col,
              taskIDs: insert(destination.index, target, col.taskIDs),
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
                    <Column key={column.id} index={index} {...column}>
                      {column.taskIDs
                        .map((id) => tasks.find(propEq("id", id)))
                        .map(
                          (task, index) =>
                            task && (
                              <Task key={task.id} index={index} {...task} />
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
