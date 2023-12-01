import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import * as user_client from '../../clients/user_client.js';

export default function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await user_client.signup(credentials);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div className='w-full'>
      <h1>Signup//</h1>
      <div className='flex flex-row max-w-xs content-center-signin'>
        <form className="w-full max-w-sm">
          <h1 className='flex text-3xl font-bold dark:text-white mb-4 mt-2'>Sign up</h1>
          {error && <div>{error}</div>}
          <p style={{color: 'red'}}>{error}</p>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                Username
              </label>
            </div>
            <div className='md:w-2/3'>
              <input 
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200" 
                value={credentials.username}
                onChange={(e) => setCredentials({
                  ...credentials,
                username: e.target.value })}
              />
            </div>
          </div>
          
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                Password
              </label>
            </div>
            <div className='md:w-2/3'>
              <input
                type='password'
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200"
                value={credentials.password}
                onChange={(e) => setCredentials({
                  ...credentials,
                  password: e.target.value})}/>
            </div>
          </div>

          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label className='block md:text-right mb-1 md:mb-0 pr-4'>
                Role
              </label>
            </div>
            <div class="md:w-2/3">
              <select className="border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-200">
                <option>Reader</option>
                <option>Write</option>
              </select>
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button className="bg-sky-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
                onClick={signup}> 
                Register and sign in 
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
};