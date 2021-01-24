import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import auth0 from "../../../utils/auth0";

export default function Movie({ user }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    overview: "",
    release_date: "",
    genres: [],
    director: "",
    actors: [],
  });
  const [movie, setMovie] = useState(null);
  const id = router.query.id;

  const getMovieFromId = async () => {
    const res = await fetch(`http://localhost:3000/api/movies/${id}`);
    const movie = await res.json();
    setMovie(movie.data);
    const {
      title,
      overview,
      release_date,
      genres,
      director,
      actors,
    } = movie.data;
    setForm({ title, overview, release_date, genres, director, actors });
  };

  useEffect(() => {
    if (id) {
      getMovieFromId();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let actors = form.actors.split(",");
    const data = {
      ...form,
      actors:
        typeof form.actors == "string" ? form.actors.split(",") : form.actors,
      genres:
        typeof form.genres == "string" ? form.genres.split(",") : form.genres,
    };
    await fetch(`http://localhost:3000/api/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    router.push("/admin/showcasedMovies");
  };

  return movie && user['http://is_admin/app_metadata'].is_admin ? (
    <div>
      <div className="flex items-start">
        <Link href="/admin/showcasedMovies">
          <div className="flex flex-none m-4 p-2 cursor-pointer text-yellow-300 bg-gray-600 rounded-md border border-yellow-300 hover:bg-gray-900">
            <svg
              className="h-6 w-6 text-yellow-300 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
            Showcased movies
          </div>
        </Link>
        <div className="flex-col justify-start items-center mr-44">
          <div className="flex justify-center" style={{ height: "350px" }}>
            <img
              src={"http://image.tmdb.org/t/p/w1280" + movie.backdrop}
              className="w-full rounded-b-xl object-cover object-center"
            />
          </div>
          <div className="flex mt-4">
            <div className="flex-none">
              <img
                className="rounded-md object-fill"
                style={{ height: "280px" }}
                src={"https://image.tmdb.org/t/p/w200/" + movie.poster}
              />
              <div className="bg-gray-700 rounded-xl p-3 mt-4 shadow-xl">
                <div className="text-white font-fira">Ratings</div>
                <div className="text-yellow-400 font-allerta break-all w-40">
                  {movie.ratings.join(", ")}
                </div>
                <div className="text-white font-fira">Max Rating</div>
                <div className="text-yellow-400 font-allerta">
                  {Math.max(...movie.ratings)}
                </div>
                <div className="text-white font-fira">Min Rating</div>
                <div className="text-yellow-400 font-allerta">
                  {Math.min(...movie.ratings)}
                </div>
                <div className="text-white font-fira">Mean</div>
                <div className="text-yellow-400 font-allerta">
                  {Math.round(
                    (movie.ratings.reduce((a, b) => a + b, 0) /
                      movie.ratings.length) *
                      100,
                  ) / 100}
                </div>
              </div>
            </div>
            <div className="text-white px-4 w-full">
              <form
                onSubmit={(e) => onSubmit(e)}
                onChange={(e) => handleChange(e)}
                className="flex-col space-y-4 w-full"
              >
                <div className="flex-col w-full">
                  <label htmlFor="title">Title: </label>
                  <br />
                  <input
                    className="bg-gray-700 w-full rounded p-3"
                    name="title"
                    type="text"
                    value={form.title}
                  />
                </div>
                <div>
                  <label htmlFor="overview">Synopsis: </label>
                  <br />
                  <textarea
                    className="bg-gray-700 w-full rounded p-3"
                    name="overview"
                    type="text"
                    value={form.overview}
                  />
                </div>
                <div>
                  <label htmlFor="release_date">Release Date: </label>
                  <br />
                  <input
                    className="bg-gray-700 w-full rounded p-3"
                    name="release_date"
                    type="text"
                    value={form.release_date}
                  />
                </div>
                <div>
                  <label htmlFor="genres">Genres: </label>
                  <br />
                  <input
                    className="bg-gray-700 w-full rounded p-3"
                    name="genres"
                    type="text"
                    value={form.genres}
                  />
                </div>
                <div>
                  <label htmlFor="actors">Actors: </label>
                  <br />
                  <input
                    className="bg-gray-700 w-full rounded p-3"
                    name="actors"
                    type="text"
                    value={form.actors}
                  />
                </div>
                <div>
                  <label htmlFor="director">Director: </label>
                  <br />
                  <input
                    className="bg-gray-700 w-full rounded p-3"
                    name="director"
                    type="text"
                    value={form.director}
                  />
                  <button className="my-3 float-right px-2 py-1 text-yellow-300 bg-gray-600 rounded-md border border-yellow-300 hover:bg-gray-900">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-white ml-4"> Restricted Access </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);

  return {
    props: {
      user: session?.user || null,
    },
  };
}