import { useEffect } from "react"; // fetch the data as soon as our api loads we use the useeffect hook

import MovieCard from "./movieCard";
import { useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
const API_URL = "http://www.omdbapi.com?apikey=b2e1874";

// const movie1 = {
//   Title: "Spider-Man Title Reveal",
//   Year: "2021",
//   imdbID: "tt14122734",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNjRjMmQ2NDQtNmI5NC00N2EwLTkwYWQtOTM2OGZjMmI5YmRjXkEyXkFqcGdeQXVyMTI0NTA1MDI3._V1_SX300.jpg",
// };

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  return (
    <div className="app">
      <h1>Movieland</h1>

      <div className="search">
        <input
          value={searchTerm}
          onchange={(e) => setSearchTerm(e.target.value)}
          placeholder="search for movies"
        />
        <img
          src={SearchIcon}
          alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            /// we are dynamically looping over our movies array fetched from an api
            /// we are taking each individual movie and we're dynamically passing it as a prop to our movie card
            /// its going to render all our movies
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2> no movies found </h2>
        </div>
      )}
    </div>
  );
};

export default App;
