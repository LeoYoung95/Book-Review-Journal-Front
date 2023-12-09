/* eslint-disable */
import axios from "axios";

const request = axios.create({
    withCredentials: false,
});

// Function to fetch book details, including description and additional info by OLID
export const fetchBookInfoByOLID = async (olid) => {
    try {
        const worksUrl = `https://openlibrary.org/works/${olid}.json`;
        const worksResponse = await fetch(worksUrl);
        const worksData = await worksResponse.json();
        console.log('worksData', worksData);

        let details = {
            title: worksData.title,
            // Assume first author if multiple
            author_key: worksData.authors ? worksData.authors[0].author.key : null,
            first_publish_year: worksData.first_publish_date,
            cover_i: worksData.covers ? worksData.covers[0] : null,
            genres: worksData.subjects || [],
            description: worksData.description ? (typeof worksData.description === 'string' ? worksData.description : worksData.description.value) : 'No description available',
        };

        // Fetch the author's name using the author key if available
        if (details.author_key) {
            const authorUrl = `https://openlibrary.org${details.author_key}.json`;
            const authorResponse = await fetch(authorUrl);
            const authorData = await authorResponse.json();
            details.author_name = authorData.name || 'Unknown';
        } else {
            details.author_name = 'Unknown';
        }

        // If the work has a cover ID, construct the image URL
        if (details.cover_i) {
            details.cover = `https://covers.openlibrary.org/b/id/${details.cover_i}-L.jpg`;
        }

        // Return the compiled details
        return details;
    } catch (error) {
        console.error("Error fetching book details by OLID:", error);
        throw error;
    }
}


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
export const fetchBookDetails = async (olid) => {
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

// Function to fetch book name by its Open Library ID
export const fetchBookName = async (olid) => {
    try {
        const url = `https://openlibrary.org/works/${olid}.json`;
        const response = await request.get(url);
        return response.data.title;
    } catch (error) {
        console.error("Error fetching book name:", error);
        return 'Unknown';
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

