import React from 'react';
import * as userClient from '../../clients/user_client.js';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../reducers/currentUserReducer.js'

export default function Signin() {
  const dispatch = useDispatch();
  
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const signin = async (e) => {
    e.preventDefault();
    if (credentials.email.length && credentials.password.length) {
      try {
        const currentUser = await userClient.signin(credentials);
        const { _id, role } = currentUser;
        const currentUserSlice = { userId: _id, role };
        dispatch(setCurrentUser(currentUserSlice));
        localStorage.setItem('currentUser', JSON.stringify(currentUserSlice));
        navigate('/');
      } catch (e) {
        setError(e.message)
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    }
  };
  
  return (
    <div className='w-full bg-gray-200'>
      <div className='flex flex-row max-w-xs content-center-signin'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <p style={{color: 'red'}}>{error}</p>

          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Email
            </label>
            <input 
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-200'
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            />
          </div>
          
          <div className='mb-4'>
            <label className='mb-2'>
              Password
            </label>
            <input
              type='password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-sky-200'
              value={credentials.password} 
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          
          <div className='flex items-center justify-between'>
            <button className='bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={e => signin(e)}> Sign in </button>
            <Link className='inline-block align-baseline font-bold text-sm text-sky-500 hover:text-sky-800' 
              to='/signup'> Sign up here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
};