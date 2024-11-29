export enum TaskStatusEnum {
  ToDo = 'to-do',
  Done = 'done',
}

export interface Task {
  _id: string; // could check for the mongodb id type
  title: string;
  description: string;
  status: TaskStatusEnum;
  startDate: Date;
  dueDate: Date;
  doneDate: Date | null | undefined;
}

export interface Project {
  _id: string; // could check for the mongodb id type
  title: string;
  description: string;
  tasks: Array<string>;
  startDate: Date;
  dueDate: Date;
}
