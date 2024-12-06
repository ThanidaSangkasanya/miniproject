import prisma from "@/utils/db";
import BooksPage from "../app/component/Book";
import { getSession } from "@/utils/loginUser";
import Logout from "../app/component/logout";

export const metadata = {
  title: 'Atlanta',
  description: 'Online bookstore example layout',
  icons: {
    icon: '/favicon.ico',
  },
};



  export default async function Home(){

    const users = await prisma.user.findMany({});

    const user = await getSession()

    
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
  {user ? (
    <div className="flex items-center space-x-2">
      <span className="text-lg font-medium text-gray-800">Hello, {user.name}</span>
    </div>
  ) : (
    <div>
      {/* Add Login and Register buttons or other content here if needed */}
    </div>
  )}
  {user && (
    <div>
      <Logout />
    </div>
  )}
</div>

      {/*<SearchBar />*/}
      
      
      <main className="bg-white p-4">
        <div className="container mx-auto">
         
          <BooksPage/>
        </div>
      </main>
    </>
  );
};


