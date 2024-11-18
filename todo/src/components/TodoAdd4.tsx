import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { AddTodoType, TodoType } from "../types";

//GET method
const fetchTodos = async () => {
  const response = await axios.get("http://localhost:3001/todos");
  return response.data;
};

// POST method
const addTodo = async (todo: AddTodoType) => {
  const response = await axios.post("http://localhost:3001/todos", todo);
  return response.data;
};

const OptimisticUpdate = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const { mutate: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousPostData = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (oldTodo: []) =>
        oldTodo
          ? [...oldTodo, { ...newTodo, id: String(oldTodo?.length + 1) }]
          : oldTodo
      );
      return {
        previousPostData,
      };
    },
    onError: (_error, _post, context) => {
      queryClient.setQueryData(["posts"], context?.previousPostData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const addTodo: AddTodoType = { title, body };

    addTodoMutation(addTodo);
    setTitle("");
    setBody("");
  };

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  console.log(todos);

  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          value={title}
        />
        <input
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter post body"
          value={body}
        />
        <button type="submit">Post</button>
      </form>
      <div className="todo-list">
        <h2>Add Todo Query with Optimistic Update</h2>
        {todos?.map((todo: TodoType) => (
          <Link key={todo.id} to={`/todos/${todo.id}`}>
            <div className="todo-item" key={todo.id}>
              <h3 className="todo-title">{todo.title}</h3>
              <p className="todo-body">{todo.body}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OptimisticUpdate;
