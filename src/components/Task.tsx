import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import linkIcon from "../assets/image/Notion.png"
import ownerIcon from "../assets/image/Owner Icon.png"

type Props = {
  id: string;
  index: number;
  os: Array<string>;
  title: string;
  date: Date;
  content: string;
  link: string;
  author: string;
};
export function Task({ id, index, ...task }: Props) {
  let osList = task.os.map((item) => (
  <span key={index} className={
    `rounded-md py-0.5 px-1 mr-2 
    ${item == 'ios' ? 'bg-black' : ''} 
    ${item == 'Web' ? 'bg-blue-web' : ''} 
    ${item == 'Desktop' ? 'bg-brown' : ''}`
  }>{item}</span>))
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <article
          className="bg-white rounded shadow-md p-3 text-sm text-gray-text"
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          <div className="flex text-white mb-2">
            {osList}
          </div>
          <header className="flex justify-between items-end mb-2">
            <strong className="text-base text-black font-medium">
              {task.title}
            </strong>

            <span>
              {format(task.date, "MMM dd")}
            </span>
          </header>

          <p className="mb-2">{task.content}</p>
          <div className="flex mb-2">
            <a href={task.link} 
            className="underline"
            >
              <img className="h-4 mr-1 inline-block" 
              src={linkIcon} 
              alt="linkIcon" />
              Document Link →
            </a>
          </div>
          <p>
            <img className="h-4 mr-1 inline-block" 
            src={ownerIcon} 
            alt="ownerIcon" />
            {task.author}
          </p>
        </article>
      )}
    </Draggable>
  );
}
