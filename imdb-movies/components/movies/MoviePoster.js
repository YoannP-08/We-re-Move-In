import React, { Component } from "react";
import Link from "next/link";

export class MoviePoster extends Component {
  constructor(props) {
    super(props)
      this.state = {
        userMongo: '',
        fillColor: 'none'
      }
  }

  async getUserMongoDB() {
        await fetch('/api/users', {
            method: 'GET'
        }).then(body => body.json())
            .then(body => this.setState({ userMongo: body.data.filter(user => user.id_auth0 === this.props.user.sub)}))
    }

  handleFavorite = async (e) => {
      e.stopPropagation()

     let body = await this.generateBody();
     await fetch(`http://localhost:3000/api/users/${body.user._id}`, {
          method: 'PUT',
          accept: 'application/json',
          headers: {
             'Content-Type': 'application/json'
         },
          body: JSON.stringify({
                  favorite_movies: body.favorites
          })
      });
  };
  
  generateBody = async () => {
      await this.getUserMongoDB();
      let favorites = this.state.userMongo[0].favorite_movies;
      if (favorites.includes(this.props.movie._id)) {
          favorites.splice(favorites.indexOf(this.props.movie._id), 1)
          this.setState({fillColor: "none"})
      } else {
          favorites.push(this.props.movie._id)
          this.setState({fillColor: "#db2777"})
      }
      return {
          user: this.state.userMongo[0],
          favorites: favorites
      }
  }

  componentDidMount = async () => {
      if (this.props.user) {
      await this.getUserMongoDB();
      if (this.state.userMongo) {
      if (this.state.userMongo[0].favorite_movies.includes(this.props.movie._id)) {
          this.setState({fillColor: "#db2777"})
      }
      }
      }
  }


    render() {
    return (
      <Link href={`/movies/${this.props.movie._id}`}>
        <div className="mx-2 w-44 cursor-pointer relative">
          <img
            className="rounded-md shadow-none hover:shadow-white"
            style={{ height: "265px" }}
            src={"https://image.tmdb.org/t/p/w200/" + this.props.movie.poster}
            alt={this.props.movie.title}
          />
            { this.props.user ? (
          <button
              onClick={e => this.handleFavorite(e)}
              className="absolute top-0 right-0 ">
            <svg
              className="h-8 w-8 text-pink-600 hover:text-pink-300"
              xmlns="http://www.w3.org/2000/svg"
              fill={this.state.fillColor}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>) : (
              <div/>
            )
            }
          <div className="font-contrail text-white">
            {this.props.movie ? this.props.movie.title : ""}
          </div>
          <div className="flex font-allerta text-white mb-2 justify-between items-center">
            <div>{this.props.movie ? this.props.movie.release_date : ""}</div>
            <div className="flex text-sm">
              {this.props.movie.ratings.length
                ? Math.round(
                    (this.props.movie.ratings.reduce((a, b) => a + b, 0) /
                      this.props.movie.ratings.length) *
                      100,
                  ) / 100
                : "N/A"}
              <svg
                className="h-5 w-5 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default MoviePoster;
