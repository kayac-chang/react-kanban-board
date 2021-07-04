import { Column, Task } from "./components";
import { DragDropContext } from "react-beautiful-dnd";

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
  const { columnOrder, columns, tasks } = initialData;

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="w-full h-full p-2">
        {columnOrder.map((id) => {
          const column = columns.find((col) => id === col.id);
          if (!column) return <></>;

          const { title, taskIds } = column;
          return (
            <Column key={id} title={title}>
              {tasks
                .filter((task) => taskIds.includes(task.id))
                .map((task, index) => (
                  <Task key={task.id} index={index} {...task} />
                ))}
            </Column>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default App;
