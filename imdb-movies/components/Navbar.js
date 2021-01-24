import 'tailwindcss/tailwind.css';
import Link from 'next/link';

const Navbar = ({ user }) => {

    return (
      <nav>
        <div className="flex justify-between items-center bg-gray-900 w-full h-16 px-4">
          <div className="text-2xl font-bold text-yellow-300 md:text-3xl font-squada">
            <a href="/">We're Movie In</a>
          </div>
          {/* {console.log(user.props.user.sub)} */}
          <div className="flex">
            {user.props.user ? (
              <div>
                {/* <Link href='/users/[id]' as ={`/users/${user.props.user.sub}`}></Link> */}
                { user.props.user['http://is_admin/app_metadata'].is_admin ? (
                  <div> 
                    <Link href="/admin/movies">
                      <a className="mr-5 text-yellow-300">Admin</a>
                    </Link>
                    <Link href="/admin/users">
                      <a className="mr-5 text-yellow-300">AdminUser</a>
                    </Link>
                    <Link href="/users/profile/profile">
                      <a className="mr-5 text-yellow-300">Profile</a>
                    </Link>
                    <Link href="/api/auth/logout">
                      <a className="rounded bg-yellow-300 text-gray-900 py-2 px-4 hover:bg-gray-900 hover:text-yellow-300 border border-4 border-yellow-300">
                        Logout
                      </a>
                    </Link>
                  </div>
                  ) : ( 
                    <div>
                      <Link href="/users/profile/profile">
                        <a className="mr-5 text-yellow-300">Profile</a>
                      </Link>
                      <Link href="/api/auth/logout">
                        <a className="rounded bg-yellow-300 text-gray-900 py-2 px-4 hover:bg-gray-900 hover:text-yellow-300 border border-4 border-yellow-300">
                          Logout
                        </a>
                      </Link>
                    </div>
                  )}
              </div>
            ) : (
              <a
                href="/api/auth/login"
                className="rounded bg-yellow-300 text-gray-900 py-2 px-4 hover:bg-gray-900 hover:text-yellow-300 border-2 border-yellow-300"
              >
                Sign in / Sign up
              </a>
            )}
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
