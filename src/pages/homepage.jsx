import React from 'react';
import { useSelector } from 'react-redux';
import AdminHome from "../components/homepages/AdminHome";

export default function Homepage() {
    // Access userId and role directly from the currentUser state
    const userId = useSelector(state => state.currentUser.userId);
    const role = useSelector(state => state.currentUser.role);

    // Check if a user is signed in and if they are an Admin
    const isAdmin = userId && role === 'Admin';

    return (
        <div>
            {/* Conditionally render the AdminHome component or other content */}
            {userId ? (
                isAdmin ? <AdminHome /> : <div>Welcome!</div>
            ) : (
                <div>Please sign in to view this content.</div>
            )}
        </div>
    );
};
