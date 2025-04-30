import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MostPopular.css"; // optional styling
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const tmdb_api = "1131ab6f7e96fcc1c729699cbf8b22cc";
const tmdb_url = "https://api.themoviedb.org/3";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

const MostPopular = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`${tmdb_url}/movie/popular`, {
          params: {
            api_key: tmdb_api,
            language: "en-US",
            page: 1,
          },
        });
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching most popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="most-popular-container">
      <Navbar/>
      <h2 className="section-title">🎬 Most Popular Movies</h2>
      <div className="movie-grid">
        {popularMovies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostPopular;
