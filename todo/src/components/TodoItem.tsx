import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchPostDetails = (todoId: string | undefined) => {
  return axios.get(`http://localhost:3001/todos/${todoId}`);
};

const TodoItemPage = () => {
  const { todoId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos", todoId],
    queryFn: () => fetchPostDetails(todoId),
  });

  if (isLoading) {
    return <div>Page is loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const { title, body } = data?.data || {};

  return (
    <div className="post-details-container">
      <div className="post-details-title">{title}</div>
      <div className="post-details-body">{body}</div>
    </div>
  );
};

export default TodoItemPage;
