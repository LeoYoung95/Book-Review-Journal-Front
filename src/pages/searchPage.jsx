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
                    <h1 style={{textAlign: 'center'}}><strong>Please Enter A Book Name.</strong></h1>
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