import { MoviesList } from "../components/movies/MoviesList";
import { useEffect } from 'react';
import auth0 from '../utils/auth0';


export default function Home({ user }) {
  const postUserMongo = (newUser) => {
    if (newUser.sub.startsWith('google')) {
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: newUser.given_name,
          email: `${newUser.nickname}@gmail.com`,
          is_admin: user['http://is_admin/app_metadata'].is_admin,
          id_auth0: newUser.sub
        })
      })
    } else {
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: newUser.nickname,
          email: newUser.name,
          is_admin: user['http://is_admin/app_metadata'].is_admin,
          id_auth0: newUser.sub
        })
      })
    }

  }

  useEffect(() => {
    if (user != null) {
      postUserMongo(user);
    }
  }, []);

  return (
    <div className="mx-2 md:mx-10 lg:mx-44 mt-5">
      <MoviesList user={user}/>
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