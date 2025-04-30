// Trending.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css"; // Reuse the styling from Home
import Navbar from "./Navbar";
const tmdb_api = "1131ab6f7e96fcc1c729699cbf8b22cc";
const tmdb_url = "https://api.themoviedb.org/3";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";
import { Link } from "react-router-dom";


const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${tmdb_url}/trending/movie/day`, {
          params: { api_key: tmdb_api },
        });
        setTrendingMovies(res.data.results);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    fetchTrending();
  }, []);

  const renderMovieCard = (movie) => (
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
  );


  return (
    <div className="home-container">
      <Navbar/>
      <h2 className="section-title">🔥 Trending Movies Today</h2>
      <div className="movie-row">{trendingMovies.map(renderMovieCard)}</div>
    </div>
  );
};

export default Trending;
