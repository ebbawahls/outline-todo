export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type List = {
  id: string;
  title: string;
  todos: Todo[];
  coverImage?: string;
};
