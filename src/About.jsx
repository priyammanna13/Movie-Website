import React from "react";
import "./About.css"; // Optional: Create this file for styling
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="about-container">
        <Navbar/>
      <h1 className="about-title">🎥 About MovieZone</h1>
      
      <p className="about-text">
        <strong>MovieZone</strong> is your one-stop platform for discovering and exploring movies from around the globe. Whether you're in the mood for popular blockbusters, critically acclaimed top-rated films, or the latest trending hits, MovieZone brings it all to your screen — beautifully and effortlessly.
      </p>

      <h2 className="about-subtitle">🌟 Features</h2>
      <ul className="about-list">
        <li>🔍 Real-time search powered by TMDB API</li>
        <li>🎬 Explore popular, top-rated, and trending movies</li>
        <li>🖼️ View movie posters, release dates, ratings, and overviews</li>
        <li>⚡ Lightning-fast UI built with React.js & Vite</li>
        <li>💡 Clean, responsive, and user-friendly design</li>
      </ul>

      <h2 className="about-subtitle">🧠 Tech Stack</h2>
      <ul className="about-list">
        <li>⚛️ Frontend: React.js (Vite)</li>
        <li>📡 API: The Movie Database (TMDB)</li>
        <li>🎨 Styling: CSS Modules / Custom CSS</li>
        <li>🌐 Routing: React Router DOM</li>
      </ul>

      <h2 className="about-subtitle">👨‍💻 Developer Note</h2>
      <p className="about-text">
        This project was created with love by Priyam as a way to learn full-stack development, experiment with APIs, and build an awesome user experience. It will continue to evolve with new features like genre filters, watchlists, trailers, and more!
      </p>

      <footer className="about-footer">
        <p>© {new Date().getFullYear()} MovieZone — Powered by TMDB API</p>
      </footer>
    </div>
  );
};

export default About;
