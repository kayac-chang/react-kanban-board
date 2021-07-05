import { ReactNode } from "react";
import { Droppable } from "react-beautiful-dnd";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};
export function Column({ id, title, children }: Props) {
  return (
    <div className="border p-2">
      <h3 className="text-2xl">{title}</h3>

      <Droppable droppableId={id}>
        {({ innerRef, droppableProps, placeholder }) => (
          <div className="py-2 space-y-2" ref={innerRef} {...droppableProps}>
            {children}

            {placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
