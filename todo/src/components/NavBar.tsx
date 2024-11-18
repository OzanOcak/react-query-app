import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/todos-fetch">Todo List</Link>
        </li>
        <li>
          <Link to="/todos">Todo Query</Link>
        </li>
        <li>
          <Link to="/animals">Animals</Link>
        </li>
        <li>
          <Link to="/animals-scroll-1">Scroll-1</Link>
        </li>
        <li>
          <Link to="/animals-scroll-2">Scroll-2</Link>
        </li>
        <li>
          <Link to="/addtodo">Add-1</Link>
        </li>
        <li>
          <Link to="/addtodo2">Add-2</Link>
        </li>
        <li>
          <Link to="/addtodo3">Add-3</Link>
        </li>
        <li>
          <Link to="/addtodo4">Add-4</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
