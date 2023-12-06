import React from 'react';
import { useSelector } from 'react-redux';
import AuthorReviewManagement from '../author/authorManageReviews';

const AuthorHome = () => {
    const currentUser = useSelector(state => state.currentUser); // Assuming this is how you access the current user

    // Check if the user is an Author
    if (currentUser && currentUser.role === 'Author') {
        return <AuthorReviewManagement />;
    }

    return <div>Access Denied</div>;
};

export default AuthorHome;
