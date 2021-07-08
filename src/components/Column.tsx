import clsx from "clsx";
import { ReactNode } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  index: number;
};
export function Column({ id, title, index, children, className }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          className={clsx("border p-2 flex flex-col", className)}
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          <h3 className="text-2xl">{title}</h3>

          <Droppable droppableId={id} type="Task">
            {({ innerRef, droppableProps, placeholder }, snapshot) => (
              <div
                className={clsx(
                  "py-2 space-y-2 flex-1",
                  snapshot.isDraggingOver && "bg-blue-300"
                )}
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
