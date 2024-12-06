import Link from "next/link";

const StaffButton: React.FC = () => (
    <Link className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200" href="/staff_login">
      For Staff
    </Link>
  );
  
  export default StaffButton;
  