import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import ownerSvg from "../assets/images/owner.svg";
import linkSvg from "../assets/images/link.svg";

type Props = {
  id: string;
  index: number;
  title: string;
  date: Date;
  content: string;
  owner: string;
  links: { title: string; url: string }[];
  tags: string[];
};

export function Task({ id, index, ...task }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <article
          className="bg-white rounded shadow-md p-3 flex flex-col gap-2 text-sm text-gray-text"
          {...draggableProps}
          {...dragHandleProps}
          ref={innerRef}
        >
          <p className="flex gap-2 text-white">
            {task.tags.map((tag) => (
              <span className="bg-blue rounded-md py-0.5 px-2">{tag}</span>
            ))}
          </p>
          <header className="flex justify-between items-end">
            <strong className="text-base text-black font-medium">
              {task.title}
            </strong>

            <span>{format(task.date, "MMM dd")}</span>
          </header>

          <p className="text-xs">{task.content}</p>

          <footer className="flex flex-col gap-2">
            <ul className="underline">
              {task.links.map((link) => (
                <li className="">
                  <a className="flex gap-1 items-center" href={link.url}>
                    <img src={linkSvg} alt="" />
                    {link.title} →
                  </a>
                </li>
              ))}
            </ul>

            <span className="flex gap-1 items-center">
              <img src={ownerSvg} alt="" />
              {task.owner}
            </span>
          </footer>
        </article>
      )}
    </Draggable>
  );
}
