import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchInput, clearSearchInput } from '../../reducers/searchReducer'; // Adjust the path as needed

export default function Searchbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchInput = useSelector((state) => state.search.searchInput);
  const currentUser = useSelector((state) => state.currentUser); // Access the current user

  useEffect(() => {
    // Check if the user is on the home page
    if (location.pathname === '/') {
      dispatch(clearSearchInput());
    }
  }, [dispatch, location.pathname]);
  const handleInputChange = e => {
    dispatch(setSearchInput(e.target.value));
  }

  const handleSearch = e => {
    e.preventDefault();
    const trimmedInput = searchInput.trim();
    if (trimmedInput.length > 0) {
      navigate(`/search?criteria=${encodeURIComponent(trimmedInput)}`);
    } else {
      navigate('/search');
    }
  }

  // Determine the placeholder based on the user's role
  let placeholder;
  if (currentUser.role === 'Author') {
    placeholder = 'Search for Books and Write their Reviews';
  } else if (currentUser.role === 'Reader' || !currentUser.userId) {
    placeholder = 'Search for Books and their Reviews';
  } else if (currentUser.role === 'Admin') {
    return null; // Hide the entire component for Admins
  }

  return (
      <div>
        <form onSubmit={handleSearch}>
          <div className='border-b border-sky-500 py-1 '>
            <input
                type='text'
                value={searchInput}
                onChange={handleInputChange}
                placeholder={placeholder}
                className='py-2 px-2 rounded w-[300px] h-[30px] placeholder:italic placeholder:text-slate-400'
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