import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import ownerSvg from "../assets/images/owner.svg";
import linkSvg from "../assets/images/link.svg";
import clsx from "clsx";
import { Task as ITask } from "../types/board";

type Props = ITask & {
  index: number;
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
          <header>
            {task.tags.map((item) => (
              <span
                key={item}
                className={clsx(
                  `rounded-md py-0.5 px-1 mr-2 text-white`,
                  item === "ios" && "bg-black",
                  item === "Web" && "bg-blue-web",
                  item === "Desktop" && "bg-brown"
                )}
              >
                {item}
              </span>
            ))}

            <div className="flex justify-between items-end">
              <strong className="text-base text-black font-medium">
                {task.title}
              </strong>

              <span>{format(task.date, "MMM dd")}</span>
            </div>
          </header>

          <p className="text-xs">{task.content}</p>

          <footer className="flex flex-col gap-2">
            <ul className="underline">
              {task.links.map((link) => (
                <li key={link.title}>
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
