import React, { useState, useEffect } from "react";
import axios from "axios";
import { TodoType } from "../types";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/todos");
      setTodos(response.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>Error has occurred...</div>;
  }

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          <h3 className="todo-title">{todo.title}</h3>
          <p className="todo-body">{todo.body}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
