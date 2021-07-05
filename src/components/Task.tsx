import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";

type Props = {
  id: string;
  index: number;
  content: string;
};
export function Task({ id, index, content }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
        <div
          className={clsx("border p-2", snapshot.isDragging && "bg-green-300")}
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
