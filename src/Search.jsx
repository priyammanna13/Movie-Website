import React, { useState } from "react";
import axios from "axios";
import './home.css'

export default function Search() {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [searchResults, setSearchResults] = useState([]);
  const tmdb_api = "1131ab6f7e96fcc1c729699cbf8b22cc";
  const tmdb_url = "https://api.themoviedb.org/3";
  const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const searchRes = await axios.get(`${tmdb_url}/search/movie`, {
          params: {
            api_key: tmdb_api,
            language: "en-US",
            query: searchQuery,
            page: 1,
          },
        });
        setSearchResults(searchRes.data.results);
      } catch (err) {
        console.error("Error searching movies:", err);
      }
    }
  };

  const renderMovieCard = (movie) => (
    <div key={movie.id} className="movie-card">
      <img
        src={`${posterBaseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-meta">
          ⭐ {movie.vote_average} • 📅 {movie.release_date}
        </p>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  );
  // State to store search results
  return (
    // <div>

    <div className="home-container">
      {/* Search Bar */}
      <section className="search-section">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a movie..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </section>

      {/* Display search results if available */}
      {searchResults.length > 0 && (
        <section>
          <h2 className="section-title">🔍 Search Results</h2>
          <div className="movie-row">{searchResults.map(renderMovieCard)}</div>
        </section>
      )}
    </div>
  );
}
