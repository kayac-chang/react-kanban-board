import { Draggable } from "react-beautiful-dnd";

type Props = {
  id: string;
  index: number;
  content: string;
};
export function Task({ id, index, content }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div
          className="border p-2"
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
