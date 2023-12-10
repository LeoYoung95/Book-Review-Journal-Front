import React from 'react';
import {useLocation} from 'react-router-dom';
import BookList from '../components/book/bookList.jsx';
import BookTrending from "../components/book/bookTrending";

const SearchPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const criteria = searchParams.get('criteria');

    if (!criteria) {
        return (
            <div>
                <div style={{paddingTop: '20px'}}>
                    <h2 className="trending-title">Please enter a book name to search.</h2>
                    <h1 className="pt-10" style={{textAlign: 'center'}}><strong>Or check out our trending books here:</strong></h1>
                </div>
                    <BookTrending/>
            </div>
        );
    } else {
        return (
            <div>
                <div style={{paddingTop: '20px'}}>
                    <BookList searchQuery={criteria}/>
                </div>
            </div>
        );
    }
}

export default SearchPage;