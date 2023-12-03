import axios from "axios";

const request = axios.create({
    withCredentials: false,
});

// Function to fetch book info by book name
 export const fetchBookInfo = async (bookName) => {
    try {
        // Replace spaces with '+' for the API query
        const formattedBookName = bookName.split(' ').join('+');

        // URL for Open Library search
        const url = `https://openlibrary.org/search.json?q=${formattedBookName}`;

        // Send request to Open Library API
        const response = await request.get(url);

        // Check if any books are found
        if (response.data.docs.length === 0) {
            throw new Error('No books found with the given name.');
        }

        // Process all found books
        const books = response.data.docs.map(bookData => ({
            olid: bookData.key.split('/').pop(), // Extracting OLID from the key
            title: bookData.title,
            author: bookData.author_name ? bookData.author_name.join(', ') : 'Unknown',
            publishDate: bookData.first_publish_year || 'Unknown',
            genres: bookData.subject ? bookData.subject.join(', ') : 'Unknown',
            description: bookData.first_sentence ? bookData.first_sentence.join('. ') : 'No description available',
            cover: bookData.cover_i ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg` : null,
        }));

        return books;
    } catch (error) {
        console.error("Error fetching book info:", error);
        throw error;
    }
};

// Function to fetch books by author name
export const fetchBooksByAuthor = async (authorName) => {
    try {
        // Replace spaces with '+' for the API query
        const formattedAuthorName = authorName.split(' ').join('+');

        // URL for Open Library author search
        const url = `https://openlibrary.org/search.json?author=${formattedAuthorName}`;

        // Send request to Open Library API
        const response = await request.get(url);

        // Check if any books are found
        if (response.data.docs.length === 0) {
            throw new Error('No books found for the given author.');
        }

        // Limit the results to the first 10 books
        const limitedBooks = response.data.docs.slice(0, 10);

        // Process the limited number of books
        const books = limitedBooks.map(bookData => ({
            olid: bookData.key.split('/').pop(), // Extracting OLID from the key
            title: bookData.title,
            publishDate: bookData.first_publish_year || 'Unknown',
            genres: bookData.subject ? bookData.subject.join(', ') : 'Unknown',
            description: bookData.first_sentence ? bookData.first_sentence.join('. ') : 'No description available',
            cover: bookData.cover_i ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg` : 'No cover available'
        }));

        return books;
    } catch (error) {
        console.error("Error fetching books by author:", error);
        throw error;
    }
};

