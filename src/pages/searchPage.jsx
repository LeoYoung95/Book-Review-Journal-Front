import React from 'react';
import { useLocation } from 'react-router-dom';
import BookList from '../components/book/bookList.jsx';

const SearchPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const criteria = searchParams.get('criteria') || '';
    
    return (
        <div>
            <div style={{ paddingTop: '20px' }}>
                <BookList searchQuery={criteria} />
            </div>
        </div>
    );
};

export default SearchPage;