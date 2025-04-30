import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './MovieWatch.css'; // ✅ plain CSS import (not a module)

const MovieWatch = ({ movieTitle, contentType = 'movie' }) => {
  const [contentId, setContentId] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_KEY = '1131ab6f7e96fcc1c729699cbf8b22cc';

  useEffect(() => {
    const fetchContentId = async () => {
      try {
        // Determine endpoint based on contentType
        const endpoint = contentType === 'series' 
          ? 'https://api.themoviedb.org/3/search/tv'
          : 'https://api.themoviedb.org/3/search/movie';

        const response = await fetch(
          `${endpoint}?api_key=${API_KEY}&query=${movieTitle}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          setContentId(data.results[0].id);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content ID:', error);
        setLoading(false);
      }
    };

    if (movieTitle) {
      fetchContentId();
    }
  }, [movieTitle, contentType]);

  const togglePlayer = () => {
    setShowPlayer(!showPlayer);
  };

  if (loading) {
    return (
      <div className="spinnerWrapper">
        <div className="spinner"></div>
      </div>
    );
  }

  // Determine the appropriate embed URL and button text
  const embedType = contentType === 'series' ? 'series' : 'movie';
  const watchButtonText = contentId 
    ? (contentType === 'series' ? 'Watch Series' : 'Watch Movie')
    : (contentType === 'series' ? 'Series Not Found' : 'Movie Not Found');

  return (
    <div className="container">
      <div className="centerButton">
        <button
          onClick={togglePlayer}
          className="watchButton"
          disabled={!contentId}
        >
          {watchButtonText}
        </button>
      </div>

      {showPlayer && contentId && (
        <div className="modalOverlay">
          <div className="videoWrapper">
            <button onClick={togglePlayer} className="closeButton">
              <X size={30} />
            </button>
            <iframe
              src={`https://vidsrc.xyz/embed/${embedType}?tmdb=${contentId}`}
              width="100%"
              height="100%"
              allowFullScreen
              title={`${contentType === 'series' ? 'Series' : 'Movie'} Stream`}
              className="border-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieWatch;
