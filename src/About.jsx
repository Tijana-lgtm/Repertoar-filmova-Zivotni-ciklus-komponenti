import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AppInfo from "./AppInfo";
import AuthorInfo from "./AuthorInfo";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>O aplikaciji</h2>
      
      <div className="about-nav">
        <Link to="/about/app">O aplikaciji</Link>
        <Link to="/about/author">O autoru</Link>
      </div>
      
      <div className="about-content">
        <Routes>
          <Route path="app" element={<AppInfo />} />
          <Route path="author" element={<AuthorInfo />} />
          <Route path="/" element={<p>Izaberite jednu od opcija iznad.</p>} />
        </Routes>
      </div>
    </div>
  );
};

export default About;