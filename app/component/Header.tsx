import Image from 'next/image';
import CartButton from '../component/cartButton';


const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#8FDDE7] to-[#FFC2C7] text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="container m-2">
          <h1 className="text-2xl font-bold ">Welcome to the Atlanta Bookstore</h1>
          {/* Add more content here */}
        </div>

        

      
      </div>
    </header>
  );
};

export default Header;
