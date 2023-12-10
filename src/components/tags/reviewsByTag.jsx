import React, { useEffect, useState } from 'react';
import { findTagById} from "../../clients/tag_client";
import ReviewCard from '../review/reviewCard';
import '../admin/adminReviewManagement.css';
import {useParams} from "react-router-dom";

const TagReview = (tag) => {
    const {tagId} = useParams();

    const [reviewIds, setReviewIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedTag = await findTagById(tagId);
                if (fetchedTag && fetchedTag.reviews) {
                    setReviewIds(fetchedTag.reviews);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData();
    }, [tagId]);


    console.log(reviewIds)
    return (
        <div className="admin-review-management">
            <h1 className="admin-review-title">Reviews on this tag</h1>
            <div className="review-cards-container">
                {reviewIds.map(reviewId => (
                    <ReviewCard
                        key={reviewId}
                        reviewId={reviewId}
                    />
                ))}
            </div>
        </div>
    );
};

export default TagReview;
