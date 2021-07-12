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
          className="bg-white rounded shadow-md p-3 text-sm text-gray-text leading-8"
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
         
          <div>
            <span className="bg-blue rounded shadow-md p-1 text-sm text-white">{task.device}</span>
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
                <img className="inline-block box-border h-5 w-5" src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fff307fed-4664-46b0-8de1-6fdcc1e937b2%2FNotion-logo.png?table=block&id=83715d77-03ee-4b86-99b5-e659a4712dd8&spaceId=e12b42ac-4e54-476f-a4f5-7d6bdb1e61e2&width=250&userId=&cache=v2"/>
                <a className="inline-block ml-2 underline" href="https://www.figma.com/" target="_blank" >{task.link1}</a>
              </li>
              <li>
                <img className="inline-block box-border h-5 w-5" src="https://img.icons8.com/color/452/medieval-crown.png"/>
                <p className="inline-block ml-2">{task.content}</p>
              </li>
            </ul>
          </div>
        </article>
      )}
    </Draggable>
  );
}
