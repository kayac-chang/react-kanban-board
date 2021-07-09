import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";

type Props = {
  id: string;
  device: string;
  index: number;
  title: string;
  date: Date;
  link1: string;
  link2: string;
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
          <div>
            <span>{task.device}</span>
          </div>
          <header className="flex justify-between items-end">
            <strong className="text-base text-black font-medium">
              {task.title}
            </strong>
            <span>{format(task.date, "MMM dd")}</span>
          </header>
          <div>
            <ul>
              <li>
                <a href="https://www.figma.com/" target="_blank" >{task.link1}</a>
              </li>
              <li>
                <a href="https://www.figma.com/" target="_blank" >{task.link2}</a>
              </li>
              <li>
                <p>{task.content}</p>
              </li>
            </ul>
          </div>
        </article>
      )}
    </Draggable>
  );
}
