export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface userProps {
  email: string;
  password: string;
}

export interface TodoProps {
  todo: ITodo;
  updateTodo: (data: ITodo) => void;
  deleteTodo: (data: ITodo) => void;
}
