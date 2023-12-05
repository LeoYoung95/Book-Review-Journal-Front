import axios from "axios";

const request = axios.create({
    withCredentials: false,
});

// Helper function to process description text
const processDescription = (description) => {
    if (!description) {
        return 'No description available';
    }

    // Remove URLs
    let processedDescription = description.replace(/https?:\/\/\S+/g, '');

    // Remove text following '[source]'
    const sourceIndex = processedDescription.indexOf('[source]');
    if (sourceIndex !== -1) {
        processedDescription = processedDescription.substring(0, sourceIndex);
    }

    // Truncate to the first 100 words
    const words = processedDescription.split(/\s+/).slice(0, 100);
    processedDescription = words.join(' ');

    // Remove trailing special characters (excluding period, exclamation, and question marks)
    processedDescription = processedDescription.replace(/[\,\;\:\(\)\[\]\'\"\`\*\&\^\$\#\@\!\?\.\-]+$/, '');

    return words.length >= 100 ? `${processedDescription}...` : processedDescription;
};



// Helper function to fetch detailed book information
const fetchBookDetails = async (olid) => {
    try {
        const url = `https://openlibrary.org/works/${olid}.json`;
        const response = await request.get(url);
        let description = response.data.description ? response.data.description.value || response.data.description : '';
        return processDescription(description);
    } catch (error) {
        console.error("Error fetching book details:", error);
        return 'No description available';
    }
};

// Function to fetch book info by book name
export const fetchBookInfo = async (bookName) => {
    try {
        const formattedBookName = bookName.split(' ').join('+');
        const url = `https://openlibrary.org/search.json?q=${formattedBookName}`;
        const response = await request.get(url);

        if (response.data.docs.length === 0) {
            throw new Error('No books found with the given name.');
        }

        // Process all found books
        const books = await Promise.all(response.data.docs.map(async (bookData) => {
            const olid = bookData.key.split('/').pop();
            const description = await fetchBookDetails(olid);
            return {
                olid: olid,
                title: bookData.title,
                author: bookData.author_name ? bookData.author_name.join(', ') : 'Unknown',
                publishDate: bookData.first_publish_year || 'Unknown',
                genres: bookData.subject ? bookData.subject.join(', ') : 'Unknown',
                description: description,
                cover: bookData.cover_i ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg` : null,
            };
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

