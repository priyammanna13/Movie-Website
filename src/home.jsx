import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import Navbar
import "./home.css"; // Import external CSS
import { Link } from "react-router-dom";

const tmdb_api = "1131ab6f7e96fcc1c729699cbf8b22cc";
const tmdb_url = "https://api.themoviedb.org/3";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularRes, topRatedRes, tvPopularRes, tvTopRatedRes] =
          await Promise.all([
            axios.get(`${tmdb_url}/movie/popular`, {
              params: { api_key: tmdb_api, language: "en-US", page: 1 },
            }),
            axios.get(`${tmdb_url}/movie/top_rated`, {
              params: { api_key: tmdb_api, language: "en-US", page: 1 },
            }),
            axios.get(`${tmdb_url}/tv/popular`, {
              params: { api_key: tmdb_api, language: "en-US", page: 1 },
            }),
            axios.get(`${tmdb_url}/tv/top_rated`, {
              params: { api_key: tmdb_api, language: "en-US", page: 1 },
            }),
          ]);
        setPopularMovies(popularRes.data.results);
        setTopRatedMovies(topRatedRes.data.results);
        setPopularTVShows(tvPopularRes.data.results);
        setTopRatedTVShows(tvTopRatedRes.data.results);
      } catch (err) {
        console.error("Error fetching movies and TV series:", err);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    try {
      const [movieRes, tvRes] = await Promise.all([
        axios.get(`${tmdb_url}/search/movie`, {
          params: {
            api_key: tmdb_api,
            language: "en-US",
            query: query,
            page: 1,
          },
        }),
        axios.get(`${tmdb_url}/search/tv`, {
          params: {
            api_key: tmdb_api,
            language: "en-US",
            query: query,
            page: 1,
          },
        }),
      ]);

      // Combine and tag the results with a type
      const moviesWithType = movieRes.data.results.map((item) => ({
        ...item,
        media_type: "movie",
      }));
      const tvWithType = tvRes.data.results.map((item) => ({
        ...item,
        media_type: "tv",
      }));

      const combinedResults = [...moviesWithType, ...tvWithType];
      setSearchResults(combinedResults);
    } catch (err) {
      console.error("Error searching movies and TV series:", err);
    }
  };

  const renderMovieCard = (item) => {
    // Determine the correct path based on the media type
    const path = item.media_type === "tv" ? "/tv" : "/movie";

    return (
      <Link
        to={{
          pathname: `${path}/${item.id}`, // Direct path based on media type
          state: { media_type: item.media_type }, // Pass media type in state
        }}
        key={item.id}
        className="movie-card"
      >
        <img
          src={
            item.poster_path
              ? `${posterBaseUrl}${item.poster_path}`
              : "/fallback.jpg" // Fallback image if no poster
          }
          alt={item.title || item.name}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title">{item.title || item.name}</h3>
          <p className="movie-meta">
            ⭐ {item.vote_average} • 📅{" "}
            {item.release_date || item.first_air_date}
          </p>
          <p className="movie-meta">
            📌 {item.media_type === "movie" ? "Movie" : "TV Series"}
          </p>
          <p className="movie-overview">
            {item.overview || "No overview available."}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <div className="home-container">
      <Navbar onSearch={handleSearch} />

      {/* Display search results if available */}
      {searchResults.length > 0 ? (
        <section>
          <h2 className="section-title">🔍 Search Results</h2>
          <div className="movie-row">{searchResults.map(renderMovieCard)}</div>
        </section>
      ) : (
        <>
          {/* Default Popular Movies */}
          <section>
            <h2 className="section-title">🎬 Most Popular Movies</h2>
            <div className="movie-row">
              {popularMovies.map(renderMovieCard)}
            </div>
          </section>

          {/* Default Top Rated Movies */}
          <section>
            <h2 className="section-title">⭐ Top Rated Movies</h2>
            <div className="movie-row">
              {topRatedMovies.map(renderMovieCard)}
            </div>
          </section>

          {/* Default Popular TV Series */}
          <section>
            <h2 className="section-title">📺 Popular TV Series</h2>
            <div className="movie-row">
              {popularTVShows.map(renderMovieCard)}
            </div>
          </section>
          {/* Top Rated TV Series */}
          <section>
            <h2 className="section-title">🏆 Top Rated TV Series</h2>
            <div className="movie-row">
              {topRatedTVShows.map(renderMovieCard)}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
