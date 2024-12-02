import Link from "next/link";

const LoginButton: React.FC = () => (
    <Link className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200" href="login">
      Login
    </Link>
  );
  
  export default LoginButton;
  