import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

const NavigationTracker = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [navigationHistory, setNavigationHistory] = useState([]);


    const getTitleFromLocation = (location) => {
        const path = location.pathname;

        // Define a mapping for static paths
        const staticPathTitles = {
            '/': 'Home',
            '/profile': 'Profile',
            '/signup': 'Sign Up',
            '/signin': 'Sign In',
            '/search': 'Search',
            '/trending': 'Trending Books',
            // ... add other static paths
        };

        // Check if the path is static and return the title
        if (staticPathTitles[path]) {
            return staticPathTitles[path];
        }

        // Handle dynamic segments
        const pathSegments = path.split('/').filter(segment => segment);

        // Example for handling dynamic paths
        if (pathSegments.length > 1) {
            switch (pathSegments[0]) {
                case 'profile':
                    // For /profile/:id, use a generic title or fetch specific data
                    return 'User Profile'; // Replace with dynamic data if available

                case 'book':
                    // For /book/:olid, you might want to fetch the book's title
                    return 'Book Details'; // Replace with dynamic data if available

                case 'reviews':
                    // For /reviews/:reviewId, you might want to fetch the review's title
                    return 'Review Details'; // Replace with dynamic data if available

                case 'tags':
                    // For /tags/:tagId, you might want to fetch the tag's name
                    return 'Tagged Reviews'; // Replace with dynamic data if available

                case 'review-editor':
                    // For /review-editor/:reviewId, use a generic title or fetch specific data
                    return 'Review Editor'; // Replace with dynamic data if available
            }
        }

        // Default title if no specific mapping is found
        return 'Page';
    };

    useEffect(() => {
        const title = getTitleFromLocation(location);
        const newPath = location.pathname;

        setNavigationHistory((prevHistory) => {
            // If navigating to Home, reset the history
            if (newPath === '/') {
                return [{ path: '/', title: 'Home' }];
            }

            // Check if the current path is already in the history
            const existingIndex = prevHistory.findIndex(item => item.path === newPath);
            if (existingIndex !== -1) {
                // Remove all entries after the existing entry to avoid duplicates
                return prevHistory.slice(0, existingIndex + 1);
            }

            // Add the new path to the history
            return [...prevHistory, { path: newPath, title }];
        });
    }, [location]);

    // Handle the "Go Back" action
    const goBack = () => {
        if (navigationHistory.length > 1) {
            // Remove the last path from navigationHistory
            const updatedHistory = [...navigationHistory];
            updatedHistory.pop();

            // Check if the new last path is a parent of the current path
            const currentPath = location.pathname;
            const lastPath = updatedHistory[updatedHistory.length - 1].path;

            if (currentPath.startsWith(lastPath)) {
                // If it's a parent, update the breadcrumb
                setNavigationHistory(updatedHistory);
            } else {
                // If it's not a parent, navigate back to the previous path
                navigate(lastPath);
            }
        }
    };



    // Handle the case when clicking on a parent route
    const handleParentRouteClick = (index) => {
        if (index < navigationHistory.length - 1) {
            // Remove child routes after the clicked parent route
            const updatedHistory = navigationHistory.slice(0, index + 1);
            setNavigationHistory(updatedHistory);

            // Navigate to the parent route
            const parentPath = updatedHistory[index].path;
            navigate(parentPath);
        }
    };

    return children(navigationHistory, goBack, handleParentRouteClick);
};

export default NavigationTracker;