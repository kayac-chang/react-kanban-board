import clsx from "clsx";
import { ReactNode } from "react";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
};
export function Column({ id, title, children, className }: Props) {
  return (
    <div className={clsx("border p-2 flex flex-col", className)}>
      <h3 className="text-2xl">{title}</h3>

      <Droppable droppableId={id}>
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
  );
}
