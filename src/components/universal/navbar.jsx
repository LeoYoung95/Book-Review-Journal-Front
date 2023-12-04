import React from 'react';
import logo from '../../images/logo.svg';
import '../../App.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentUser} from '../../reducers/currentUserReducer.js';
import Searchbar from '../search/searchbar.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  
  const handleSignoutClicked = () => {
    dispatch(removeCurrentUser());
    localStorage.removeItem('currentUser');
  }
  
  return (
    <div className='navbar shadow mb-3 h-[60px] w-full top-0 z-50 fixed flex justify-between items-center px-4 '>
      <button onClick={() => navigate('/')}>
        <img 
          src={logo} 
          alt='logo' 
          className='h-[45px]'
        />
      </button>
      
      <Searchbar />
      
      <div>
        <Link 
          to='/profile'
          className='mr-3 hover:text-blue-500'
        >
          Profile
        </Link>
        {
          currentUser.userId.length ?
            <button 
              onClick={() => handleSignoutClicked()}
              className='hover:text-blue-500'
            >
              Sign out
            </button> :
            <Link to='/signin'>Signin</Link>
        }
      </div>
    </div>
  )
};