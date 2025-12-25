import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>🎬 Repertoar Filmova</h1>
      <nav>
        <Link to="/">Pocetna</Link>
        <Link to="/movies">Filmovi</Link>
        <Link to="/about">O aplikaciji</Link>
      </nav>
    </header>
  );
};

export default Header;