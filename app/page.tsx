import Head from 'next/head';
import prisma from "@/utils/db"
import Link from "next/link";
import Header from './component/Header/page';
import CartButton from './component/cartButton';
import RegisterButton from './component/RegistorButton';
import LoginButton from './component/LoginButton';
//import SearchBar from '../components/SearchBar';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Atlanta</title>
        <meta name="description" content="Online bookstore example layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div >
      
      </div>
      {/*<SearchBar />*/}
      <main className="bg-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Atlanta Bookstore</h1>
          {/* Add more content here */}
        </div>
      </main>
    </>
  );
};

export default Home;
