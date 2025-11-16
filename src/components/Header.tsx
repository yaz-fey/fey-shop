import React from 'react';
import { Link } from 'react-router-dom';
import CartButton from './CartButton';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">Fey-Shop</span>
        </Link>
        <div>
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
