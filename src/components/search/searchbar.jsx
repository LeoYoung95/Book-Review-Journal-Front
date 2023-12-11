import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchInput, clearSearchInput} from '../../reducers/searchReducer'; // Adjust the path as needed

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

    const handleTrending = e => {
        e.preventDefault();
        navigate('/trending');
    }

    // Determine the placeholder based on the user's role
    let placeholder;
    if (currentUser.role === 'Author') {
        placeholder = 'Search for Books & Write Reviews';
    } else if (currentUser.role === 'Reader' || !currentUser.userId) {
        placeholder = 'Search for Books & Read Reviews';
    } else if (currentUser.role === 'Admin') {
        return null; // Hide the entire component for Admins
    }

    return (
        <div>
            <form onSubmit={handleSearch}>

                <div className='border-b border-sky-500 py-1 pl-2 pr-2 '>
                    <div className='row pl-4 pr-4'>
                        <div className='col'>
                            <input
                                type='text'
                                value={searchInput}
                                onChange={handleInputChange}
                                placeholder={placeholder}
                                className='py-2 px-2 rounded placeholder:italic placeholder:text-slate-400 w-full sm:w-[300px] h-[30px]'
                            />

                        </div>
                        <div className='col'>
                            <button
                                type='submit'
                                className='bg-sky-200 rounded h-[30px] px-2 ml-1'
                            >
                                Search
                            </button>
                            {/* Trending Book Button */}
                            <button
                                onClick={handleTrending}
                                className='trending-button bg-green-200 rounded h-[30px] px-2 ml-1'
                            >
                                Trending
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}