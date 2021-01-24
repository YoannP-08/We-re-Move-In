import styles from "../../styles/Home.module.css";
import MoviesListAdmin from "../../components/movies/MoviesListAdmin";
import auth0 from "../../utils/auth0";

export default function Movies({ user }) {
  return (
    <div>
      {user["http://is_admin/app_metadata"].is_admin ? (
        <div className={styles.container}>
          {/* <MoviesSearch></MoviesSearch> */}
          <div className="flex space-x-10 mt-8">
            <a
              className="font-fira mb-6 text-xl text-white"
              href="/admin/movies"
            >
              Popular movies
            </a>
            <div className="font-fira mb-6 text-xl text-white"> | </div>
            <h1 className="font-fira mb-6 text-xl text-yellow-300">
              Showcased movies
            </h1>
          </div>
          <MoviesListAdmin></MoviesListAdmin>
        </div>
      ) : (
        "Restricted Access"
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
