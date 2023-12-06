import React from 'react';
import { useSelector } from 'react-redux';

const ReaderHome = () => {
    const currentUser = useSelector(state => state.currentUser); // Assuming this is how you access the current user


    return <div>Reader Home</div>;
};

export default ReaderHome;
