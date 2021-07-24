import { Task, Column } from "../types/board";

const tasks: Task[] = [
  {
    id: "task-1",
    tags: ["iOS", "Android"],
    title: "Take out the garbage",
    date: new Date(),
    content: "Pilot version with Lottie",
    owner: "Sathish",
    links: [
      {
        title: "Document Link",
        url: "https://www.notion.so/",
      },
    ],
  },
  {
    id: "task-2",
    title: "Watch my favorite show",
    date: new Date(),
    content: "Pilot version with Lottie",
    owner: "Guna",
    links: [
      {
        title: "Document Link",
        url: "https://www.notion.so/",
      },
    ],
    tags: ["iOS"],
  },
  {
    id: "task-3",
    title: "Charge my phone",
    date: new Date(),
    content: "Pilot version with Lottie",
    owner: "Gura",
    links: [
      {
        title: "Document Link",
        url: "https://www.notion.so/",
      },
    ],
    tags: ["Web"],
  },
  {
    id: "task-4",
    title: "Cook dinner",
    date: new Date(),
    content: "Pilot version with Lottie",
    owner: "Sathish",
    links: [
      {
        title: "Document Link",
        url: "https://www.notion.so/",
      },
    ],
    tags: ["Desktop"],
  },
];

const columns: Column[] = [
  {
    id: "column-1",
    title: "To do",
    taskIDs: ["task-1", "task-2", "task-3", "task-4"],
  },
  {
    id: "column-2",
    title: "In progress",
    taskIDs: [],
  },
  {
    id: "column-3",
    title: "Done",
    taskIDs: [],
  },
];

export default {
  tasks,
  columns,
  columnOrder: ["column-1", "column-2", "column-3"],
};
