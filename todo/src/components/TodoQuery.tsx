import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TodoType } from "../types";
import { Link } from "react-router-dom";

const fetchTodos = async () => {
  const response = await axios.get("http://localhost:3001/todos");
  return response.data;
};

const TodoQuery: React.FC = () => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
    //isRefetching,
    //refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    //staleTime: 10000,
    //refetchInterval: 5000,
    //refetchIntervalInBackground: true,
    //enabled: false,  <button onClick={() => refetch()}>Fetch</button>
  });

  //console.log(todos);
  console.log({ isLoading: isLoading, isError: isError });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching todos: {error.message}</div>;

  return (
    <>
      <div className="todo-list">
        <h2>Todo Query</h2>
        {todos?.map((todo: TodoType) => (
          <Link key={todo.id} to={`/todos/${todo.id}`}>
            <div className="todo-item" key={todo.id}>
              <h3 className="todo-title">{todo.title}</h3>
              <p className="todo-body">{todo.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TodoQuery;
