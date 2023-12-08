import React from 'react';
import logo from '../images/logo.svg';
import { useNavigate, Link } from 'react-router-dom';
import Searchbar from './searchbar.jsx';

export default function Navar() {
  const navigate = useNavigate();

  return (
    <div className='bg-pink-500 mb-3 h-[60px] w-full top-0 z-50 fixed flex justify-between items-center px-4'>
      <button onClick={() => navigate('/')}>
        <img 
          src={logo} 
          alt='logo' 
          className='h-[45px]'
        />
      </button>
      
      <Searchbar />

      <div>
        <Link to='/signin'>Signin</Link>
      </div>
    </div>
  )
};