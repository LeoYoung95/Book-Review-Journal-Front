import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {fetchBookInfo} from '../clients/openlib_client.js';
import {findBookReviewsByOpenLibraryId} from '../clients/book_client.js';
import BookCardLarger from '../components/book/bookCardLarger.jsx';

const BookDetail = () => {
    const {olid} = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch the book details
                const bookData = await fetchBookInfo(olid);
                // Assuming that the function returns the first book in case of multiple results
                setBookDetails(bookData[0]);

                console.log("olid: ", olid);

                // Fetch the reviews for this book using its OLID
                const relatedReviews = await findBookReviewsByOpenLibraryId(olid);
                setReviews(relatedReviews);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDetails();
    }, [olid]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div>
                {/* Book details section */}
                {bookDetails && (
                    <div>
                        {bookDetails && <BookCardLarger book={bookDetails}/>}

                    </div>
                )}
            </div>
            <div>
                {/* Reviews section (will be replaced with reviewList component */}
                <h1>Related Reviews</h1>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id}>
                            {/* Display review details */}
                            <p>{review.title}</p>

                        </div>
                    ))
                ) : (
                    <p>No reviews found for this book.</p>
                )}
            </div>
        </div>
    );
};

export default BookDetail;
