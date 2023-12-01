import React from 'react';
import * as user_client from '../../clients/user_client.js';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signin = async () => {
    if (credentials.username.length && credentials.password.length) {
      try {
        await user_client.signin(credentials);
        navigate("/");
      } catch (e) {
        setError(e.response.data.message)
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    }
  };
  return (
    <div className='w-full bg-gray-200'>
      <h1>Signin//</h1>
      <div className='flex flex-row max-w-xs content-center'>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p style={{color: 'red'}}>{error}</p>

          <div class="mb-4">
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Username
            </label>
            <input 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-none focus:border-sky-200" 
              placeholder='Username'
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>

          <div class="mb-4">
            <label className='form-control mb-2'>
              Password
            </label>
            <input
              type='password'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-none focus:border-sky-200"
              value={credentials.password} 
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>

          <div class="flex items-center justify-between">
            <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={signin}> Sign in </button>
            <Link className="inline-block align-baseline font-bold text-sm text-sky-500 hover:text-sky-800" 
              to="/signup"> Sign up here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
};