import React from "react";
import './Modal.css';

const Modal = ({ movie, onClose }) => {
  if (!movie) return null; 

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{movie.Title}</h2>
        <img src={movie.Poster} alt={movie.Title} className="movie-modal" />
        <p className="director"> Directed by {movie.Director}</p>
        <p className="release-date"> {movie.Released}, {movie.Runtime}</p>
        <p className="genre"> {movie.Genre}</p>
        <p className="rating"> 🍿{movie.imdbRating}</p>
        <p className="plot"> {movie.Plot}</p>
      </div>
    </div>
  );
};

export default Modal;