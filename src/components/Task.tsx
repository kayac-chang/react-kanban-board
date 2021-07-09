import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";

type Props = {
  id: string;
  index: number;
  title: string;
  date: Date;
  content: string;
};
export function Task({ id, index, ...task }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <article
          className="bg-white rounded shadow-md p-3 text-sm text-gray-text"
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          <header className="flex justify-between items-end">
            <strong className="text-base text-black font-medium">
              {task.title}
            </strong>

            <span>{format(task.date, "MMM dd")}</span>
          </header>

          <p>{task.content}</p>
        </article>
      )}
    </Draggable>
  );
}
