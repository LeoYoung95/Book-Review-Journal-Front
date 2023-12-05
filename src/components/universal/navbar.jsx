import React from 'react';
import logo from '../../images/logo.svg';
import '../../App.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCurrentUser } from '../../reducers/currentUserReducer.js';
import { isLoggedIn } from '../../utils/loggedInUtil.js';
import Searchbar from '../search/searchbar.jsx';
import axios from 'axios';
import {signout} from '../../clients/user_client.js';

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignoutClicked = async () => {
        try {
            // Call the backend API to destroy the session
            await signout();

            // Update Redux state and remove user data from localStorage
            dispatch(removeCurrentUser());
            localStorage.removeItem('currentUser');

            // Navigate to the home page
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className='navbar shadow mb-3 h-[60px] w-full top-0 z-50 fixed flex justify-between items-center px-4'>
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
                    isLoggedIn() ?
                        <button
                            onClick={handleSignoutClicked}
                            className='hover:text-blue-500'
                        >
                            Sign Out
                        </button> :
                        <Link to='/signin'>Sign-In</Link>
                }
            </div>
        </div>
    );
};
