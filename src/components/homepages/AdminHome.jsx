import React from 'react';
import { useSelector } from 'react-redux';
import AdminReviewManagement from '../admin/adminManageReviews';
import AdminMyDeletedReviewsManagement from "../admin/adminMyDeletedReviews";

const AdminHome = () => {
    const currentUser = useSelector(state => state.currentUser); // Assuming this is how you access the current user

    // Check if the user is an Admin
    if (currentUser && currentUser.role === 'Admin') {
        return (
            <div className="admin-home-row">
                <div className="col col-md-8">
                    <AdminReviewManagement/>
                </div>
                <div className="col col-md-4 align-items-start">
                    <AdminMyDeletedReviewsManagement/>
                </div>
            </div>
        )
    }

    return <div>Access Denied</div>;
};

export default AdminHome;
