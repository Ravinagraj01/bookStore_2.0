import React, { useEffect, useState } from 'react';
import Cards from './Cards';

function FeaturedBooks() {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeaturedBooks();
    }, []);

    const fetchFeaturedBooks = async () => {
        try {
            setLoading(true);
            
            // Fetch books from multiple categories to create a diverse featured collection
            const categories = [
                'subject:fiction',
                'subject:romance',
                'subject:mystery',
                'subject:"science fiction"',
                'subject:fantasy'
            ];
            
            const allBooks = [];
            
            // Fetch 4 books from each category
            for (const category of categories) {
                try {
                    const response = await fetch(
                        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(category)}&maxResults=4&orderBy=relevance`
                    );
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data.items) {
                            const formattedBooks = data.items.map(book => ({
                                id: book.id,
                                name: book.volumeInfo.title,
                                title: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
                                image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image',
                                price: book.saleInfo?.saleability === 'FOR_SALE' ? `$${book.saleInfo.listPrice?.amount || 'N/A'}` : 'Free',
                                description: book.volumeInfo.description || 'No description available',
                                publishedDate: book.volumeInfo.publishedDate,
                                pageCount: book.volumeInfo.pageCount,
                                categories: book.volumeInfo.categories || [],
                                previewLink: book.volumeInfo.previewLink,
                                infoLink: book.volumeInfo.infoLink
                            }));
                            allBooks.push(...formattedBooks);
                        }
                    }
                } catch (err) {
                    console.error(`Error fetching ${category}:`, err);
                }
            }
            
            // Shuffle the books to create a random mix
            const shuffledBooks = allBooks.sort(() => Math.random() - 0.5);
            setFeaturedBooks(shuffledBooks.slice(0, 12)); // Show max 12 books
            
        } catch (err) {
            setError('Failed to fetch featured books');
            console.error('Error fetching featured books:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
                <div className='mb-8'>
                    <h1 className='font-semibold text-2xl pb-4'>Featured Books</h1>
                    <p className='text-gray-600 dark:text-gray-400'>
                        Discover handpicked books from various genres and categories.
                    </p>
                </div>
                <div className="flex justify-center items-center py-12">
                    <div className="loading loading-spinner loading-lg"></div>
                    <span className="ml-3">Loading featured books...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
                <div className='mb-8'>
                    <h1 className='font-semibold text-2xl pb-4'>Featured Books</h1>
                    <p className='text-gray-600 dark:text-gray-400'>
                        Discover handpicked books from various genres and categories.
                    </p>
                </div>
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    return (
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
            <div className='mb-8'>
                <h1 className='font-semibold text-2xl pb-4'>Featured Books</h1>
                <p className='text-gray-600 dark:text-gray-400'>
                    Discover handpicked books from various genres and categories.
                </p>
            </div>
            
            {featuredBooks.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredBooks.map((book) => (
                        <Cards item={book} key={book.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default FeaturedBooks;
