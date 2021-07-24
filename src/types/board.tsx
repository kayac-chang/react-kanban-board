export interface Link {
  title: string;
  url: string;
}

export interface Task {
  id: string;
  tags: string[];
  title: string;

  date: Date;
  content: string;
  owner: string;
  links: Link[];
}

export interface Column {
  id: string;
  title: string;
  taskIDs: string[];
}
