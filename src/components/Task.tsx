import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";

type Props = {
  id: string;
  index: number;
  title: string;
  date: Date;
  content: string;
  owner: string;
  links: { title: string, url: string }[];
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
            {
              task.tags.map((tag) => <span className="bg-blue rounded-md py-0.5 px-2">{tag}</span>)
            }
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
              {
                task.links.map((link) => <li className="">
                  <a className="flex gap-1 items-center" href={link.url}>
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path stroke="null" d="M3.747 12.905a2.862 2.862 0 0 1-2.038-.857 2.86 2.86 0 0 1-.855-2.146c.03-.829.405-1.625 1.082-2.302l1.22-1.224a.466.466 0 1 1 .66.658l-1.22 1.225c-.989.988-1.082 2.275-.227 3.13.854.854 2.14.76 3.128-.227l1.676-1.676c.508-.508.788-1.088.81-1.677A1.937 1.937 0 0 0 7.4 6.357a2.063 2.063 0 0 0-.437-.335.466.466 0 0 1 .462-.81c.229.131.442.294.634.486a2.86 2.86 0 0 1 .855 2.146c-.03.828-.405 1.624-1.082 2.301l-1.675 1.676c-.678.677-1.473 1.051-2.302 1.082a3.052 3.052 0 0 1-.108.002zM6.849 8.49a.466.466 0 0 0-.175-.636 2.063 2.063 0 0 1-.436-.335c-.855-.854-.761-2.14.227-3.129L8.14 2.715c.988-.988 2.275-1.081 3.129-.227.854.854.76 2.14-.228 3.13l-1.22 1.224a.466.466 0 1 0 .661.658l1.22-1.224c.676-.677 1.05-1.473 1.082-2.301a2.86 2.86 0 0 0-.856-2.146A2.86 2.86 0 0 0 9.782.973c-.828.031-1.624.405-2.301 1.083L5.805 3.73c-.677.677-1.051 1.473-1.082 2.302a2.86 2.86 0 0 0 .855 2.145c.192.192.405.355.635.486a.464.464 0 0 0 .636-.174z" /></svg>
                    {link.title} →
                  </a>
                </li>)
              }
            </ul>

            <span className="flex gap-1 items-center">
              <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity=".8" stroke-linecap="round" stroke-linejoin="round"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.593 10.55h8.636L13 3.962 9.878 5.357 6.924 0 4.412 5.275 1 3.962l1.593 6.588z" fill="#F4C550" stroke="#EE9241" /><path d="M3.447 12.895h6.993" stroke="#F2A867" /></g></svg>
              {task.owner}
            </span>
          </footer>
        </article>
      )}
    </Draggable>
  );
}
