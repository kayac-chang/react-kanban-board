import { ReactNode } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  index: number;
};
export function Column({ id, title, index, children }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          className="flex flex-col w-80 rounded overflow-hidden bg-gray-fill shadow"
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          <h2 className="bg-blue text-white text-center py-1">{title}</h2>

          <Droppable droppableId={id} type="Task">
            {({ innerRef, droppableProps, placeholder }) => (
              <div
                className="flex-1 py-4 px-2 space-y-4"
                ref={innerRef}
                {...droppableProps}
              >
                {children}

                {placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
