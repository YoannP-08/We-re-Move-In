import React, { Component } from "react";

export class MoviePosterAdmin extends Component {
  constructor(props) {
    super(props);
  }

  addMovieToShowcase = async (movie) => {
    let {
      id,
      backdrop_path,
      title,
      overview,
      poster_path,
      release_date,
      genres,
      actors,
      director,
    } = movie;
    let movieToInsert = {
      id_movieDb: id,
      backdrop: backdrop_path,
      rating: [],
      title: title,
      overview: overview,
      poster: poster_path,
      release_date: release_date,
      genres: genres,
      director: director,
      actors: actors,
    };
    await fetch("http://localhost:3000/api/movies", {
      method: "POST",
      body: JSON.stringify(movieToInsert),
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.props.addMovie(id.toString());
  };

  deleteMovieFromShowcase = async (id) => {
    await fetch(`http://localhost:3000/api/movies/${id}`, {
      method: "DELETE",
    });
    this.props.removeMovie(id.toString());
  };

  render() {
    return (
      <div className="mx-2 w-44 relative">
        {this.props.moviesInDbId.includes(this.props.movie.id.toString()) ? (
          <div>
            {window.location.href !== "http://localhost:3000/admin/movies" ? (
              <a
                className="absolute top-0 right-8 focus:outline-none"
                href={`/admin/movies/${this.props.movie._id}`}
              >
                <svg
                  className="h-8 w-8 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </a>
            ) : (
              ""
            )}
            <button
              className="absolute top-0 right-0 focus:outline-none"
              onClick={() => this.deleteMovieFromShowcase(this.props.movie.id)}
            >
              <svg
                className="h-8 w-8 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            className="absolute top-0 right-0 focus:outline-none"
            onClick={() => this.addMovieToShowcase(this.props.movie)}
          >
            <svg
              className="h-8 w-8 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}

        <img
          className="rounded-md shadow-none hover:shadow-white"
          style={{ height: "265px" }}
          src={
            this.props.movie.poster_path
              ? "https://image.tmdb.org/t/p/w200/" +
                this.props.movie.poster_path
              : "/default.png"
          }
        ></img>
        <div className="font-contrail text-white">
          {this.props.movie ? this.props.movie.title : ""}
        </div>
        <div className="font-allerta text-white mb-2">
          {this.props.movie ? this.props.movie.release_date : ""}
        </div>
      </div>
    );
  }
}

export default MoviePosterAdmin;
