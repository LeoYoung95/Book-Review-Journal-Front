import React from 'react';
import {useSelector} from 'react-redux';
import AdminReviewManagement from "../admin/adminReviewManagement";

const AdminHome = () => {
    const currentUser = useSelector(state => state.currentUser); // Assuming this is how you access the current user

    // Check if the user is an Admin
    if (currentUser && currentUser.role === 'Admin') {
        return (
            <div className="admin-home-row">

                <AdminReviewManagement/>

            </div>
        )
    }

    return <div>Access Denied</div>;
};

export default AdminHome;
