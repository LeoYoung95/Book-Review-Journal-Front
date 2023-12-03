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
        <input 
          type='text'
          value={searchInput}
          onChange={handleInputChange}
          className='rounded w-[450px] h-[30px]'
        />
        <button 
          type='submit' 
          className='bg-yellow-500 rounded h-[30px] px-2 ml-1'
        >
          Search
        </button>
      </form>
    </div>
  )
}