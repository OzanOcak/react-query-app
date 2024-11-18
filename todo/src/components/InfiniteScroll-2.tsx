import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchAnimals = ({ pageParam }: any) => {
  return axios.get(
    `http://localhost:3001/animals/?_limit=10&_page=${pageParam}`
  );
};

const InfiniteQueries2 = () => {
  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["animals"],
      queryFn: fetchAnimals,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < 5) {
          return allPages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <h2>Page is Loading...</h2>;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div className="container">
      {data?.pages?.map((page) => {
        return page?.data.map((animal: { id: number; name: string }) => {
          return (
            <div className="fruit-item" key={animal.id}>
              {animal.name}
            </div>
          );
        });
      })}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};

export default InfiniteQueries2;
