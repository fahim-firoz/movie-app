import React from "react";
import "./App.css";
import searchIcon from "./search.svg";
import Movie from "./Movie.js";

export default function App() {
  const apiUrl = "http://www.omdbapi.com?apikey=71e3fdf1";
  const [movieArray, setMovieArray] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    setMovieArray(data.Search);
  };

  const movieElements = movieArray.map((data) => {
    return (
      <Movie
        Title={data.Title}
        Year={data.Year}
        imdbID={data.imdbID}
        Type={data.Type}
        Poster={data.Poster}
      ></Movie>
    );
  });

  React.useEffect(() => {
    searchMovies("superman");
  }, []);

  console.log(movieArray);

  function findMovie(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="app">
      <h1>MovieWeb</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          onChange={findMovie}
          value={searchTerm}
        />
        <img src={searchIcon} onClick={() => searchMovies(searchTerm)} />
      </div>
      {movieArray.length > 0 ? (
        movieElements
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}
