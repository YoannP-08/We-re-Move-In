import styles from "../../styles/Home.module.css";
import MoviesSearch from "../../components/movies/MoviesSearch";
import PopularMoviesList from "../../components/movies/PopularMoviesList";
import auth0 from "../../utils/auth0";

export default function Movies({ user }) {
  return (
    <div>
      {user["http://is_admin/app_metadata"].is_admin ? (
        <div className={styles.container}>
          <div className="flex space-x-10 mt-8">
            <h1 className="font-fira text-xl text-yellow-300">
              Popular movies
            </h1>
            <div className="font-fira text-xl text-white"> | </div>
            <a
              className="font-fira text-xl text-white"
              href="/admin/showcasedMovies"
            >
              Showcased movies
            </a>
          </div>
          <MoviesSearch></MoviesSearch>
          <PopularMoviesList></PopularMoviesList>
        </div>
      ) : (
        "Restricted access"
      )}
    </div>
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
