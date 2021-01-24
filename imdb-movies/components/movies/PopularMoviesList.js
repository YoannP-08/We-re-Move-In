import React, { Component } from "react";
import MoviePoster from "./MoviePosterAdmin";
import { getDirector, getActors, getGenres } from "./MoviesFunctions";

export class PopularMoviesList extends Component {
  state = {
    moviesInDbId: [],
    popular_movies: [],
  };

  fetchMovies = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=beddfc03d4e9041b7938fd3654c3131a",
    );
    const popular_movies = await res.json();

    for (let i = 0; i < popular_movies.results.length; i++) {
      popular_movies.results[i].genres = await getGenres(
        popular_movies.results[i].genre_ids,
      );
      popular_movies.results[i].director = await getDirector(
        popular_movies.results[i].id,
      );
      popular_movies.results[i].actors = await getActors(
        popular_movies.results[i].id,
      );
    }
    this.setState({ popular_movies: popular_movies.results });
  };

  fetchMoviesInDb = async () => {
    const res = await fetch("http://localhost:3000/api/movies");
    let movies = await res.json();
    movies = movies.data.map(({ id_movieDb }) => id_movieDb);
    this.setState({ moviesInDbId: movies });
  };

  removeMovie = (id) => {
    this.setState({ moviesInDbId: this.state.moviesInDbId.filter(movie => movie !== id) })
  }

  addMovie = (id) => {
    this.setState({ moviesInDbId: [...this.state.moviesInDbId, id]})
  }

  componentDidMount() {
    this.fetchMovies();
    this.fetchMoviesInDb();
  }

  render() {
    return (
      <div className="flex flex-wrap container mb-5">
        {this.state.popular_movies.map((movie) => (
          <MoviePoster
            movie={movie}
            key={movie.id}
            moviesInDbId={this.state.moviesInDbId}
            removeMovie={this.removeMovie}
            addMovie={this.addMovie}
          ></MoviePoster>
        ))}
      </div>
    );
  }
}

export default PopularMoviesList;
