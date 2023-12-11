import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Breadcrumb = ({ navigationHistory }) => {
    const navigate = useNavigate();
    const currentLocation = useLocation();

    // Handle back button click
    const goBack = () => {
        navigate(-1);
    };

    // Check if the current route is the homepage
    const isHomePage = currentLocation.pathname === '/';

    const buttonStyle = {
        display: isHomePage ? 'none' : 'inline-block', // Hide button when on the homepage
    };

    const breadcrumbStyle = {
        position: 'fixed',  // Set the position to fixed
        top: '0',           // Stick it to the top of the viewport
        width: '100%',      // Make it 100% wide
        background: 'white', // Optional background color
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        height: '50px',
    };


    return (
        <div className="flex justify-between items-center mt-[80px] pl-5" style={breadcrumbStyle}>
            <ul className="flex space-x-2">
                {navigationHistory.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && <span className="mx-2">{'>'}</span>}
                        <Link
                            to={item.path}
                            className={`hover:text-blue-500 ${currentLocation.pathname === item.path ? 'text-blue-500 font-bold' : ''}`}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <button
                onClick={goBack}
                className="hover:bg-gray-100 text-blue-500 py-3 px-4 rounded"
                style={buttonStyle}
            >
                Go Back
            </button>
        </div>
    );
};

export default Breadcrumb;
