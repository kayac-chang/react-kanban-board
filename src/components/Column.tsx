import clsx from "clsx";
import { ReactNode } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

type Props = {
  id: string;
  title: ReactNode;
  children: ReactNode;
  index: number;
  className?: string;
  containerClassName?: string;
};
export function Column({
  id,
  title,
  index,
  children,
  className,
  containerClassName,
}: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          className={clsx("flex flex-col", className)}
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          {title}

          <Droppable droppableId={id} type="Task">
            {({ innerRef, droppableProps, placeholder }) => (
              <div
                className={clsx("flex-1", containerClassName)}
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
