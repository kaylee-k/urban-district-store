import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TfiPencil } from 'react-icons/tfi';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';
import Button from './ui/Button';

export default function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-200 p-2'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand font-semibold'
      >
        <HiMiniShoppingBag />
        <h1>Neon District</h1>
      </Link>
      <nav className='flex items-center gap-5 font-semibold text-lg text-gray-700 '>
        <Link
          className='transition-all duration-300 hover:scale-110'
          to='/products'
        >
          Products
        </Link>
        <Link
          className='transition-all duration-300 hover:scale-110'
          to='/carts'
        >
          Carts
        </Link>
        {user && user.isAdmin && (
          <Link
            to='/products/new'
            className='text-2xl transition-all duration-300 hover:scale-110'
          >
            <TfiPencil />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={'Login'} onClick={login} />}
        {user && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
