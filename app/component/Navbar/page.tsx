import CartButton from '../cartButton';
import LoginButton from '../LoginButton';
import RegisterButton from '../RegistorButton';

const Navbar: React.FC = () => {
  return (
    <nav className=" text-white py-2">
      <div className="container mx-auto flex justify-end space-x-4">
        <LoginButton />
        <RegisterButton />
        <CartButton />
      </div>
    </nav>
  );
};

export default Navbar;
