import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import axios from "axios";

const Navbar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSearchClick = () => {
    handleSearch(query);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/top-rated">Top Rated</Link>
      <Link to="/upcoming">Upcoming</Link>
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </nav>
  );
};

const App = () => {
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${query}&page=1`
      )
      .then((response) => setSearchResults(response.data.results))
      .catch((error) => console.error(error));
  };

  const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=1`
        )
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.error(error));
    }, []);

    return (
      <div>
        <h1>Popular Movies</h1>
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TopRated = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=1`
        )
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.error(error));
    }, []);

    return (
      <div>
        <h1>Top Rated Movies</h1>
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Upcoming = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${Api_key}&language=en-US&page=1`
        )
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.error(error));
    }, []);

    return (
      <div>
        <h1>Upcoming Movies</h1>
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MovieDetail = () => {
    const { movie_id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
        )
        .then((response) => setMovie(response.data))
        .catch((error) => console.error(error));
    }, [movie_id]);

    if (!movie) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <p>{movie.overview}</p>
      </div>
    );
  };

  const SearchResult = () => {
    return (
      <div>
        <h1>Search Result</h1>
        <Home movies={searchResults} />
      </div>
    );
  };

  return (
    <Router>
      <Navbar handleSearch={handleSearch} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/top-rated" component={TopRated} />
        <Route path="/upcoming" component={Upcoming} />
        <Route path="/movie/:movie_id" component={MovieDetail} />
        <Route path="/search" component={SearchResult} />
      </Switch>
    </Router>
  );
};

export default App;

