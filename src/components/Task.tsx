import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import iconLink from "./src/images/link_blank_24dp.png";
import iconStar from "./src/images/star_24dp.png";

type Props = {
  id: string;
  device: string;
  index: number;
  title: string;
  date: Date;
  links: string[];
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
         
          <header className="flex justify-between items-end">
            <div>
              <span className="bg-blue rounded shadow-md p-1 text-sm text-white">{task.device}</span>
            </div>
            <strong className="text-base text-black font-medium">
              {task.title}
            </strong>
            <span>{format(task.date, "MMM dd")}</span>
          </header>
          <div>
            <ul>
              <li>
                <img className="inline-block box-border h-5 w-5" src={iconLink} alt="iconLink" />
                <a className="inline-block ml-2 underline" href="https://www.figma.com/" target="_blank" >{task.links[0]}</a>
              </li>
              <li>
                <img className="inline-block box-border h-5 w-5" src={iconStar} alt="iconStar"/>
                <p className="inline-block ml-2">{task.content}</p>
              </li>
            </ul>
          </div>
        </article>
      )}
    </Draggable>
  );
}
