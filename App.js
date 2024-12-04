import './App.css';
import React, { useState, useEffect } from "react";
import MovieSection from "./MovieSection";
import Modal from "./Modal";

//API
const API_key = "86f09256"; 
const base_url = "https://www.omdbapi.com/"; 

const App = () => {
  const [movieData, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [isNavOpen, setIsNavOpen] = useState(false); 

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const fetchMovies = async (search = '') => {
    setIsLoading(true);
    const url = search 
      ? `${base_url}?s=${search}&apikey=${API_key}`
      : `${base_url}?s=movie&apikey=${API_key}`; 

    try {
      const responses = await Promise.all([
        fetch(url + '&page=1'),
        fetch(url + '&page=2')
      ]);

      const data = await Promise.all(responses.map(res => res.json()));
      
      const allMovies = data.flatMap(d => d.Response === "True" ? d.Search : []);
      
      if (allMovies.length === 0) {
        setSearchError(true);
        setData([]);
      } else {
        setSearchError(false);
        setData(allMovies.slice(0, 18));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovieDetails = (id) => {
    fetch(`${base_url}?i=${id}&apikey=${API_key}`)
      .then(res => res.json())
      .then(data => {
        setSelectedMovie(data);
      })
      .catch(error => console.error("Error fetching movie details:", error));
  };

  const handleCardClick = (id) => {
    fetchMovieDetails(id);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="container">
      <header className="header">
        <img src="plex.png" alt="Logo" className="logo" />
        <form className="search-form">
          <input 
            type="text" 
            placeholder="Find Movies & TV" 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="nav-toggle" onClick={toggleNav}>
        {isNavOpen ? '✕' : '☰'} {/* Burjer */}
        </div>
        <nav className={`Nav ${isNavOpen ? 'active' : ''}`}>
          <span>Free Movies & TV</span>
          <span>Live TV</span>
          <span>Features</span>
          <span>Download</span>
          <div className="divider"></div>
          <div className="login">
            <p>Sign In</p>
            <button>Sign Up Free</button>
          </div>
        </nav>
      </header>

      <main className="movies-section">
        {searchError ? (
          <p className="message">No results</p>
        ) : isLoading ? (
          <p className="loading">Loading.....</p>
        ) : (
          <div className="movie-grid">
            {movieData.map((movie, index) => (
              <MovieSection info={movie} key={index} onCardClick={handleCardClick} />
            ))}
          </div>
        )}
      </main>
    
      <Modal movie={selectedMovie} onClose={closeModal} />
    </div>
  );
};

export default App;
