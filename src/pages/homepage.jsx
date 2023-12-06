import React from 'react';
import {useSelector} from 'react-redux';
import AdminHome from "../components/homepages/AdminHome";
import AuthorHome from "../components/homepages/AuthorHome";
import ReaderHome from "../components/homepages/ReaderHome";
import VisitorHome from "../components/homepages/VisitorHome";

export default function Homepage() {
    // Access userId and role directly from the currentUser state
    const userId = useSelector(state => state.currentUser.userId);
    const role = useSelector(state => state.currentUser.role);

    // Check if a user is signed in and user's role
    const isAdmin = userId && role === 'Admin';
    const isAuthor = userId && role === 'Author';
    const isReader = userId && role === 'Reader';
    const isVisitor = !userId;

    return (<div>
        {isAdmin && <AdminHome/>}
        {isAuthor && <AuthorHome/>}
        {isReader && <ReaderHome/>}
        {isVisitor && <VisitorHome/>}
    </div>);
};
