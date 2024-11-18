export type TodoType = {
  id: number;
  title: string;
  body: string;
};

export type AddTodoType = Omit<TodoType, "id">;
