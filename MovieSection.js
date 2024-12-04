import React from "react";

const MovieSection = ({ info, onCardClick }) => {
  return (
    <div className="movie-container" onClick={() => onCardClick(info.imdbID)}>
      <div className="poster">
        <img 
          src={info.Poster !== 'N/A' ? info.Poster : 'placeholder.jpg'} 
          alt={info.Title} 
          className="movie-poster"
        />
      </div>
      <div className="movie-info">
        <h3>{info.Title}</h3>
        <div className="movie-meta">
          <span className="year">
            {info.Year || 'Year not available'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieSection;
