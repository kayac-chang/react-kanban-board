import { Column, Task } from "./components";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { cond, identity, insert, map, move, propEq, remove, T } from "ramda";
import { useState } from "react";

const initialData = {
  tasks: [
    {
      id: "task-1",
      os: ["ios", "Web", "Desktop"],
      title: "Take out the garbage",
      date: new Date(),
      content: "Pilot version with Lottie",
      owner: "Sathish",
      links: [
        {
          title: "Document Link",
          url: "https://www.notion.so/",
        },
      ],
      tags: ["iOS", "Android"],
    },
    {
      id: "task-2",
      os: ["ios", "Desktop"],
      title: "Watch my favorite show",
      date: new Date(),
      content: "Pilot version with Lottie",
      owner: "Guna",
      links: [
        {
          title: "Document Link",
          url: "https://www.notion.so/",
        },
      ],
      tags: ["iOS"],
    },
    {
      id: "task-3",
      os: ["ios"],
      title: "Charge my phone",
      date: new Date(),
      content: "Pilot version with Lottie",
      owner: "Gura",
      links: [
        {
          title: "Document Link",
          url: "https://www.notion.so/",
        },
      ],
      tags: ["Web"],
    },
    {
      id: "task-4",
      os: ["ios"],
      title: "Cook dinner",
      date: new Date(),
      content: "Pilot version with Lottie",
      owner: "Sathish",
      links: [
        {
          title: "Document Link",
          url: "https://www.notion.so/",
        },
      ],
      tags: ["Desktop"],
    },
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
                    <Column key={column.id} index={index} {...column}>
                      {column.taskIds
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
