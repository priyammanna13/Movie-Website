import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";
import Navbar from "./Navbar";
import MovieWatch from "./MovieWatch";



const tmdb_api = "1131ab6f7e96fcc1c729699cbf8b22cc";
const tmdb_url = "https://api.themoviedb.org/3";
const posterBaseUrl = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // Get the current location to determine if it's a movie or TV
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const isMovie = location.pathname.includes("/movie/"); // Check if URL is for a movie or TV series

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const endpoint = isMovie
          ? `${tmdb_url}/movie/${id}`
          : `${tmdb_url}/tv/${id}`;

        console.log(`Fetching details from: ${endpoint}`); // Debugging log

        const res = await axios.get(endpoint, {
          params: {
            api_key: tmdb_api,
            language: "en-US",
          },
        });

        console.log("Fetched details:", res.data); // Debugging log
        setDetails(res.data);
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to fetch details. Please try again later.");
      }
    };

    fetchDetails();
  }, [id, isMovie]);

  if (error) return <div className="error">{error}</div>;
  if (!details) return <div className="loading">Loading details...</div>;

  return (
    <div className="movie-details-container">
      <Navbar />
      <br />
      <img
        src={`${posterBaseUrl}${details.poster_path}`}
        alt={details.title || details.name}
        className="movie-details-poster"
      />
      <div className="movie-details-info">
        <h1>{details.title || details.name}</h1>
        <p>
          <strong>Release Date:</strong>{" "}
          {details.release_date || details.first_air_date}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {details.vote_average}
        </p>
        <p>
          <strong>Overview:</strong> {details.overview}
        </p>
        <p>
          <strong>Genres:</strong>{" "}
          {details.genres.map((g) => g.name).join(", ")}
        </p>
        {/* Additional content */}
        {isMovie ? (
          <p>
            <strong>Runtime:</strong> {details.runtime} mins
          </p>
        ) : (
          <p>
            <strong>Number of Seasons:</strong> {details.number_of_seasons}
          </p>
        )}
      
        {/* 👇 Watch Button Section */}
        {isMovie && <MovieWatch movieTitle={details.title} />}
      </div>
    </div>
  );
};



export default MovieDetails;










