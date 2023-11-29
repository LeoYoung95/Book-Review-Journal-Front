import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.BRJ_REACT_BASE;
export const BOOK_API = `${BASE_API}/api/book`;

// Get Book by Mongo Book ID
export const findBookByMongoId = async (mongo_id) => {
    const response = await request.get(`${BOOK_API}/${mongo_id}`);
    return response.data;
}

// Get Book by Open Library Book ID
export const findBookByOpenLibraryId = async (olid) => {
    const response = await request.get(`${BOOK_API}/olid/${olid}`);
    return response.data;
}

// Get Book's Reviews by Open Library Book ID
export const findBookReviewsByOpenLibraryId = async (olid) => {
    const response = await request.get(`${BOOK_API}/olid/${olid}/reviews`);
    return response.data;
}

// Get Book's liked users by Open Library Book ID
export const findBookLikedUsersByOpenLibraryId = async (olid) => {
    const response = await request.get(`${BOOK_API}/olid/${olid}/liked_users`);
    return response.data;
}
