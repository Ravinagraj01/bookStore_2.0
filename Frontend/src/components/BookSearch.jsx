import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import Cards from './Cards';

function BookSearch() {
    const [authUser] = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchBooks = async (query) => {
        if (!query.trim()) return;
        
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            
            const data = await response.json();
            
            if (data.items) {
                const formattedBooks = data.items.map(book => ({
                    id: book.id,
                    name: book.volumeInfo.title,
                    title: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
                    image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image',
                    price: book.saleInfo?.saleability === 'FOR_SALE' ? `$${book.saleInfo.listPrice?.amount || 'N/A'}` : 'Not for sale',
                    description: book.volumeInfo.description || 'No description available',
                    publishedDate: book.volumeInfo.publishedDate,
                    pageCount: book.volumeInfo.pageCount,
                    categories: book.volumeInfo.categories || [],
                    previewLink: book.volumeInfo.previewLink,
                    infoLink: book.volumeInfo.infoLink
                }));
                setBooks(formattedBooks);
            } else {
                setBooks([]);
            }
        } catch (err) {
            setError('Failed to fetch books. Please try again.');
            console.error('Error fetching books:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        searchBooks(searchQuery);
    };

    // Don't render if user is not logged in
    if (!authUser) {
        return null;
    }

    return (
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
            <div className='mb-8'>
                <h1 className='font-semibold text-2xl pb-4'>Search Books</h1>
                <p className='text-gray-600 dark:text-gray-400 mb-6'>
                    Discover millions of books from Google Books. Search by title, author, or any keyword.
                </p>
                
                <form onSubmit={handleSearch} className='flex gap-4 max-w-md'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for books..."
                        className="input input-bordered w-full"
                        required
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </form>
            </div>

            {error && (
                <div className="alert alert-error mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {books.length > 0 && (
                <div>
                    <h2 className='font-semibold text-xl pb-4'>Search Results ({books.length} books)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <Cards item={book} key={book.id} />
                        ))}
                    </div>
                </div>
            )}

            {!loading && !error && books.length === 0 && searchQuery && (
                <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">No books found for "{searchQuery}". Try a different search term.</p>
                </div>
            )}
        </div>
    );
}

export default BookSearch;
