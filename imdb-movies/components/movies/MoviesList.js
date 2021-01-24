import React, { Component } from "react";
import MoviePoster from "./MoviePoster";

export class MoviesList extends Component {
   constructor(props) {
       super(props);
   }
    state = {
    movies: [],
    select: null,
    genreArray: [],
    yearArray: [],
    directorArray: [],
    selectedDir: null,
    selectedGenre: null,
    selectedYear: null,
  };

  fetchMovies = async () => {
    const res = await fetch("http://localhost:3000/api/movies");
    const movies = await res.json();
    this.setState({ movies: movies.data });
    this.fillArray(movies.data);
  };

    fillArray = (movies) => {
        let dir = [];
        let genres = [];
        let year = [];
        movies.map((movie) => {
            if (!dir.includes(movie.director)) {
                dir.push(movie.director)
            }
            movie.genres.map((genre) => {
                if (!genres.includes(genre)) {
                    genres.push(genre)
                }
            })
            if (!year.includes(movie.release_date.substring(0,4))) {
                year.push(movie.release_date.substring(0,4))
            }
        })

        function lastNameSort(a,b) {
            if(a.split(" ")[1] > b.split(" ")[1])
                return 1;
            else
                return -1;
        }

        dir.sort(lastNameSort);
        genres.sort();
        year.sort();
        let newYear = [... new Set(year)]
        this.setState({
            directorArray: dir,
            genreArray: genres,
            yearArray: newYear
        })
    }

    async componentDidMount() {
        await this.fetchMovies();
    }

    selectRender = (select) => {
        switch(select.menu) {
            case 'genres':
                return this.state.movies.filter(movie => movie.genres.includes(select.value)).map((movie) => (<MoviePoster user={this.props.user} movie={movie} key={movie._id}/>) )
            case 'year':
                return this.state.movies.filter(movie => movie.release_date.includes(select.value)).map((movie) => (<MoviePoster user={this.props.user} movie={movie} key={movie._id}/>) )
            case 'director':
                return this.state.movies.filter(movie => movie.director.includes(select.value)).map((movie) => (<MoviePoster user={this.props.user} movie={movie} key={movie._id}/>) )
            case 'default':
                return this.state.movies.filter((movie) => (<MoviePoster user={this.props.user} movie={movie} key={movie._id}/>))
        }
    }

    handleSelect = (e, query) => {
        this.setState({select: {menu: query, value: e.target.value}})
        switch(query) {
            case 'director':
                document.getElementById('GenresSelect').selectedIndex = 0;
                document.getElementById('YearSelect').selectedIndex = 0;
                break;
            case 'genres':
                document.getElementById('DirectorSelect').selectedIndex = 0;
                document.getElementById('YearSelect').selectedIndex = 0;
                break;
            case 'year':
                document.getElementById('GenresSelect').selectedIndex = 0;
                document.getElementById('DirectorSelect').selectedIndex = 0;
                break;
        }
    }

    resetFilters = () => {
        document.getElementById('GenresSelect').selectedIndex = 0;
        document.getElementById('YearSelect').selectedIndex = 0;
        document.getElementById('DirectorSelect').selectedIndex = 0;
        this.setState({select: null})
    }

    render() {

        return (
          <div>
            <div className="flex flex-wrap justify-start md:justify-evenly">
              <div className="relative  md:inline-flex mb-2">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select
                  id={"DirectorSelect"}
                  onChange={(e) => {
                    this.handleSelect(e, "director");
                  }}
                  className="border border-yellow-300 cursor-pointer rounded-full text-white h-10 pl-5 pr-10 bg-gray-900 hover:border-gray-400 focus:outline-none appearance-none"
                  defaultValue={"Filter by Director"}
                >
                  <option disabled={true}>Filter by Director</option>
                  {this.state.directorArray.length !== 0 ? (
                    this.state.directorArray.map((director, index) => (
                      <option key={index}>{director}</option>
                    ))
                  ) : (
                    <option disabled={true}>Loading</option>
                  )}
                </select>
              </div>
              <div className="relative inline-flex">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select
                  id={"GenresSelect"}
                  onChange={(e) => {
                    this.handleSelect(e, "genres");
                  }}
                  className="border border-yellow-300 cursor-pointer rounded-full text-white h-10 pl-5 pr-10 bg-gray-900 hover:border-gray-400 focus:outline-none appearance-none"
                  defaultValue={"Filter by Genre"}
                >
                  <option disabled={true}>Filter by Genre</option>
                  {this.state.genreArray.map((genre, index) => (
                    <option key={index}>{genre}</option>
                  ))}
                </select>
              </div>
              <div className="relative inline-flex">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select
                  id={"YearSelect"}
                  className="border border-yellow-300 cursor-pointer rounded-full text-white h-10 pl-5 pr-10 bg-gray-900 hover:border-gray-400 focus:outline-none appearance-none"
                  onChange={(e) => {
                    this.handleSelect(e, "year");
                  }}
                  defaultValue={"Filter by Year"}
                >
                  <option disabled={true}>Filter by Year</option>
                  {this.state.yearArray.map((year, index) => (
                    <option key={index}>{year}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => this.resetFilters()}
                className="ml-3 px-2 py-1 text-red-500 bg-gray-600 rounded-md border border-red-500 hover:bg-gray-900 focus:outline-none"
              >
                Reset Filters
              </button>
            </div>
            <h1 className="font-fira my-2 text-xl text-yellow-300 overflow-hidden">
              Showcased movies
            </h1>

            <div className="flex flex-wrap justify-center md:justify-evenly mb-5">
              {this.state.select !== null
                ? this.selectRender(this.state.select)
                : this.state.movies.map((movie) => (
                    <MoviePoster user={this.props.user} movie={movie} key={movie._id} />
                  ))}
            </div>
          </div>
        );
    }
}

export default MoviesList;
