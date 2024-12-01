import Image from 'next/image';
import CartButton from '../cartButton';


const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#8FDDE7] to-[#FFC2C7] text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="container m-2">
          <h1 className="text-2xl font-bold ">Welcome to the Atlanta Bookstore</h1>
          {/* Add more content here */}
        </div>

        {/* Header Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-gray-200">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-200">
                About
              </a>
            </li>
            <li>
              <a href="/books" className="hover:text-gray-200">
                Books
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>

      
      </div>
    </header>
  );
};

export default Header;
