import React from 'react';
import { useSelector } from 'react-redux';
import AdminReviewManagement from '../admin/adminManageReviews';

const AdminHome = () => {
    const currentUser = useSelector(state => state.currentUser); // Assuming this is how you access the current user

    // Check if the user is an Admin
    if (currentUser && currentUser.role === 'Admin') {
        return <AdminReviewManagement />;
    }

    return <div>Access Denied</div>;
};

export default AdminHome;
