import React from 'react';
import { useSelector } from 'react-redux';

const VisitorHome = () => {
    const currentUser = useSelector(state => state.currentUser); // Assuming this is how you access the current user


    return <div>Visitor Home</div>;
};

export default VisitorHome;
