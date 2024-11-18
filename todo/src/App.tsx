import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import TodoList from "./components/TodoList";
import TodoQuery from "./components/TodoQuery";
import "./App.css";
import TodoItemPage from "./components/TodoItem";
import PaginatedQueries from "./components/Pagination";
import InfiniteQueries from "./components/InfiniteScroll-1";
import InfiniteQueries2 from "./components/InfiniteScroll-2";
import AddTodo from "./components/TodoAdd";
import AddTodoWithInvalidate from "./components/TodoAdd2";
import AddTodoWithSetQueryData from "./components/TodoAdd3";
import OptimisticUpdate from "./components/TodoAdd4";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos-fetch" element={<TodoList />} />
        <Route path="/todos" element={<TodoQuery />} />
        <Route path="/todos/:todoId" element={<TodoItemPage />} />
        <Route path="/animals" element={<PaginatedQueries />} />
        <Route path="/animals-scroll-1" element={<InfiniteQueries />} />
        <Route path="/animals-scroll-2" element={<InfiniteQueries2 />} />
        <Route path="/addtodo" element={<AddTodo />} />
        <Route path="/addtodo2" element={<AddTodoWithInvalidate />} />
        <Route path="/addtodo3" element={<AddTodoWithSetQueryData />} />
        <Route path="/addtodo4" element={<OptimisticUpdate />} />
      </Routes>
    </Router>
  );
};

export default App;
