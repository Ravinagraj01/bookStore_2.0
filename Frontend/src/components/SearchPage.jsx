import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Cards from './Cards';
import Navbar from './Navbar';
import Footer from './Footer';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const [authUser] = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const query = searchParams.get('q');

    useEffect(() => {
        if (query) {
            searchBooks(query);
        }
    }, [query]);

    const searchBooks = async (searchQuery) => {
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        setError('');
        
        try {
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=40`
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

    // Redirect to login if not authenticated
    if (!authUser) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Please Login to Search Books</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            You need to be logged in to access the book search functionality.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8 mt-20'>
                <div className='mb-8'>
                    <h1 className='font-semibold text-3xl pb-4'>Search Results</h1>
                    {query && (
                        <p className='text-gray-600 dark:text-gray-400 mb-6'>
                            Showing results for: <span className="font-semibold">"{query}"</span>
                        </p>
                    )}
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="loading loading-spinner loading-lg"></div>
                        <span className="ml-3">Searching for books...</span>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {!loading && !error && books.length > 0 && (
                    <div>
                        <h2 className='font-semibold text-xl pb-4'>Found {books.length} books</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {books.map((book) => (
                                <Cards item={book} key={book.id} />
                            ))}
                        </div>
                    </div>
                )}

                {!loading && !error && books.length === 0 && query && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No books found</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            No books found for "{query}". Try a different search term or check your spelling.
                        </p>
                    </div>
                )}

                {!query && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Enter a search term</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Use the search bar in the navigation to find books.
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default SearchPage;
