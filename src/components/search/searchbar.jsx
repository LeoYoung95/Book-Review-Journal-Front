import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleInputChange = e => {
    setSearchInput(e.target.value);
  }

  const handleSearch = e => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput.length > 0) {
      setSearchInput('');
      navigate(`/search?criteria=${encodeURIComponent(trimmedInput)}`);
    } else {
      navigate('/search');
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className='border-b border-sky-500 py-1 '>
          <input 
            type='text'
            value={searchInput}
            onChange={handleInputChange}
            placeholder='Search...'
            className=' py-2 px-2 
            rounded w-[300px] h-[30px] placeholder:italic placeholder:text-slate-400'
          />
          <button 
            type='submit' 
            className='bg-sky-200 rounded h-[30px] px-2 ml-1'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}