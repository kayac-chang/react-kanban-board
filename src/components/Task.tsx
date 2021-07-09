import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

type Props = {
  id: string;
  index: number;
  content: string;
  className?: string;
};
export function Task({ id, index, content, className }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          className={clsx("p-2", className)}
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          {content}
        </div>
      )}
    </Draggable>
  );
}
