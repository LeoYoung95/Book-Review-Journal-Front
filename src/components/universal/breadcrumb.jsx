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

    return (
        <div className="flex justify-between items-center mt-[85px] border-b-2 pl-5" style={{ height: '50px' }}>
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
