import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>IMDB Movies App</title>
        </Head>
        <Navbar user={ children } />
        {children}
    </>
)

export default Layout;