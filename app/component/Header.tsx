import Image from 'next/image';
import LoginButton from './LoginButton';
import RegisterButton from './RegistorButton';
import CartButton from './cartButton';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className='text-white'>
        Atlanta 
        
        </div>
        {/* Buttons */}
        <div className="flex space-x-4">
          <LoginButton />
          <RegisterButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
/*
Alvis (อัสวิส) เทพแห่งการหยั่งรู้ทุกอย่าง
Brida (บรด้า) เทพีบทกวี และภูมิปัญญา
Atlanta (แอทแลนตา) เทพีแห่งความรวดเร็ว และฉลาด ชื่อของเธอถูกนำมาตั้งเป็นชื่อมหาสมุทรแอทแลนติก */