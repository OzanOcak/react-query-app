import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchAnimals = (pageId: number) => {
  return axios.get(`http://localhost:3001/animals/?_limit=5&_page=${pageId}`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["animals", page],
    queryFn: () => fetchAnimals(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <h2>Page is Loading...</h2>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  //console.log(data?.data.data);
  //return;
  return (
    <div className="container">
      {data?.data.map((item: { id: number; name: string }) => (
        <div key={item.id} className="fruit-label">
          {item.name}
        </div>
      ))}
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page == 1 ? true : false}
      >
        Prev Page
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page == 10 ? true : false}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginatedQueries;
