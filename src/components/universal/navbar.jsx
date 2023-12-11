import React, { useState, useEffect } from 'react';
import logo from '../../images/husky-logo.png';
import '../../App.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentUser } from '../../reducers/currentUserReducer.js';
import { isLoggedIn } from '../../utils/loggedInUtil.js';
import Searchbar from '../search/searchbar.jsx';
import Modal from "react-modal";

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.currentUser.userId);
    const [showModal, setShowModal] = useState(false);
    const [isTitleVisible, setIsTitleVisible] = useState(window.innerWidth > 900);

    useEffect(() => {
        const handleResize = () => {
            setIsTitleVisible(window.innerWidth > 960);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSignoutClicked = async () => {
        try {
            dispatch(removeCurrentUser());
            localStorage.removeItem('currentUser');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleProfileClicked = () => {
        if (currentUserId) {
            navigate('/profile');
        } else {
            setShowModal(true);
        }
    };

    const handleSignInAndCloseModal = () => {
        closeModal();
        navigate('/signin');
    };

    return (
        <div className='navbar shadow mb-3 h-[80px] w-full top-0 z-50 fixed flex justify-between items-center px-4'>
            <button onClick={() => navigate('/')}>
                <img src={logo} alt='logo' className='h-[70px]'/>
            </button>

            {isTitleVisible && (
                <h1 className="text-xl font-bold pl-5">Husky Book Review Journal</h1>
            )}

            <Searchbar />

            <div className="pl-2">
                <button
                    onClick={handleProfileClicked}
                    className='mr-3 nav-bar-right-button hover:text-blue-500'
                >
                    Profile
                </button>
                {
                    isLoggedIn() ?
                        <button
                            onClick={handleSignoutClicked}
                            className='nav-bar-right-button hover:text-blue-500'
                        >
                            Sign Out
                        </button> :
                        <Link to='/signin'>Sign-In</Link>
                }
            </div>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                appElement={document.getElementById('root') || undefined}
                overlayClassName="dimmed-background"
                className="modal-container"
            >
                <div className="modal-center">
                    <p>Please sign in to view your profile</p>
                    <br/>
                    <button className="btn-danger pl-15" onClick={handleSignInAndCloseModal}>Sign In</button>
                </div>
            </Modal>
        </div>
    );
};
