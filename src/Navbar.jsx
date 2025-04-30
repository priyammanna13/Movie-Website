import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery); // Call the function passed as prop to search
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button className="navbar-title" onClick={() => (window.location.href = "/")}>📽️ MovieZone</button>
        {/* Search Bar inside Navbar */}
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a movie..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search Movies
          </button>
        </form>
        <ul className="navbar-links">
        <li>
            <button className="navbar-button" onClick={() => (window.location.href = "/")}>Home</button>
          </li>
          <li>
            <button className="navbar-button" onClick={() => (window.location.href = "/trending")}>Trending</button>
          </li>
          <li>
            <button
              className="navbar-button"
              onClick={() => (window.location.href = "/most-popular")}
            >
              Most Popular
            </button>
          </li>
          <li>
            <button className="navbar-button" onClick={() => (window.location.href = "/about")}>About</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
