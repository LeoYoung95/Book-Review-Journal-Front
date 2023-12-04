import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../reducers/currentUserReducer.js'
import * as userClient from '../../clients/user_client.js';

export default function Signup() {
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '', 
    password: '',
    firstName: '',
    lastName: '',
    role: 'Reader' 
  });
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    try {
      const currentUser = await userClient.signup(credentials);
      const { _id, role } = currentUser;
      const currentUserSlice = { userId: _id, role };
      dispatch(setCurrentUser(currentUserSlice));
      localStorage.setItem('currentUser', JSON.stringify(currentUserSlice));
      navigate('/profile');
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  
  console.log(credentials);
  return (
    <div className='w-full'>
      <div className='flex flex-row max-w-xs content-center-signin'>
        <form className='w-full max-w-sm'>
          <h1 className='flex text-3xl font-bold dark:text-white mb-4 mt-2'>Sign up</h1>
          {error && <div>{error}</div>}
          <p style={{color: 'red'}}>{error}</p>
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                Email
              </label>
            </div>
            <div className='md:w-2/3'>
              <input 
                className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200' 
                value={credentials.email}
                autoComplete='myEmail@test.com'
                type='email'
                onChange={(e) => setCredentials({
                  ...credentials,
                email: e.target.value })}
              />
            </div>
          </div>
          
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                Password
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                type='password'
                autoComplete='current-password'
                className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200'
                value={credentials.password}
                onChange={(e) => setCredentials({
                  ...credentials,
                  password: e.target.value})}/>
            </div>
          </div>
          
          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                First name
              </label>
            </div>
            <div className='md:w-2/3'>
              <input 
                className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200' 
                value={credentials.firstName}
                autoComplete='John'
                type='text'
                onChange={(e) => setCredentials({
                  ...credentials,
                firstName: e.target.value })}
              />
            </div>
          </div>

          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                Last name
              </label>
            </div>
            <div className='md:w-2/3'>
              <input 
                className='appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200' 
                value={credentials.lastName}
                autoComplete='Doe'
                type='text'
                onChange={(e) => setCredentials({
                  ...credentials,
                lastName: e.target.value })}
              />
            </div>
          </div>

          <div className='md:flex md:items-center mb-6'>
            <div className='md:w-1/3'>
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                Role
              </label>
            </div>
            <div className='md:w-2/3'>
              <select 
                className='border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200'
                value={credentials.role}
                onChange={(e) => setCredentials({
                  ...credentials,
                  role: e.target.value})}
              >
                <option>Reader</option>
                <option>Author</option>
                <option>Admin</option>
              </select>
            </div>
          </div>

          <div className='md:flex md:items-center'>
            <div className='md:w-1/3'></div>
            <div className='md:w-2/3'>
              <button className='bg-sky-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded' 
                onClick={(e) => signup(e)}> 
                Register and sign in 
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};