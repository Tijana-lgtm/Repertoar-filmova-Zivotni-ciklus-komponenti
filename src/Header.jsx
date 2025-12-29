import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>🎬 Repertoar Filmova</h1>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/movies">Movies</Link> |
        <Link to="/movies/add">Add Movie</Link>
      </nav>
    </header>
  );
};

export default Header;