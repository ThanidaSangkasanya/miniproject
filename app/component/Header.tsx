import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#8FDDE7] to-[#FFC2C7] text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <img
            src="https://cdn-icons-png.flaticon.com/128/4219/4219156.png"
            alt="readlogo"
            className="w-16 h-16 sm:w-20 sm:h-20"
          />
          {/* Text */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
            Atlanta Bookshop
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
