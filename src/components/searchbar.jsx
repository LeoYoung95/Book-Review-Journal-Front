import React, { useState } from 'react';

export default function Searchbar() {
  
  const [searchInput, setSearchInput] = useState('');
  
  const handleInputChange = e => {
    setSearchInput(e.target.value);
  }

  const handleSearch = e => {
    e.preventDefault();
    if (searchInput.length > 0) {
      console.log('search clicked');
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