import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookList from '../components/book/bookList.jsx';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const criteria = searchParams.get('criteria') || '';
    const [searchInput, setSearchInput] = useState(criteria);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?criteria=${searchInput}`);
    };

    return (
        <div>
            <div style={{ paddingTop: '20px' }}>
                <BookList searchQuery={criteria} />
            </div>
        </div>
    );
};

export default SearchPage;