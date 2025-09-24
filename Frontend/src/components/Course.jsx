import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'

function Course() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Books', query: 'subject:fiction' },
        { id: 'mystery', name: 'Mystery & Thriller', query: 'subject:mystery' },
        { id: 'romance', name: 'Romance', query: 'subject:romance' },
        { id: 'scifi', name: 'Science Fiction', query: 'subject:"science fiction"' },
        { id: 'fantasy', name: 'Fantasy', query: 'subject:fantasy' },
        { id: 'biography', name: 'Biography', query: 'subject:biography' },
        { id: 'history', name: 'History', query: 'subject:history' },
        { id: 'selfhelp', name: 'Self Help', query: 'subject:"self help"' }
    ];

    useEffect(() => {
        fetchBooks(selectedCategory);
    }, [selectedCategory]);

    const fetchBooks = async (category) => {
        try {
            setLoading(true);
            setError('');
            
            const categoryData = categories.find(cat => cat.id === category);
            const query = categoryData ? categoryData.query : 'subject:fiction';
            
            const response = await fetch(
                `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20&orderBy=relevance`
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
                    price: book.saleInfo?.saleability === 'FOR_SALE' ? `$${book.saleInfo.listPrice?.amount || 'N/A'}` : 'Free',
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

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
            <div className='pt-[100px] items-center justify-center text-center'>
                <h1 className='text-2xl font-semibold md:text-4xl'>We're delighted to have you <span className='text-pink-500'>Here! :)</span></h1>
                <p className='mt-12'>Explore our curated collection of books across various genres and categories. Discover new authors, explore different topics, and find your next favorite read. From fiction to non-fiction, we have something for every book lover!</p>
                <Link to='/'>
                    <button className='bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 mt-6'>Back</button>
                </Link>
            </div>

            {/* Category Filter */}
            <div className='mt-12 mb-8'>
                <h2 className='text-xl font-semibold mb-4 text-center'>Browse by Category</h2>
                <div className='flex flex-wrap justify-center gap-2'>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryChange(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                selectedCategory === category.id
                                    ? 'bg-pink-500 text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <div className="loading loading-spinner loading-lg"></div>
                    <span className="ml-3">Loading books...</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="alert alert-error mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Books Grid */}
            {!loading && !error && books.length > 0 && (
                <div className='mt-8'>
                    <h3 className='text-lg font-semibold mb-4 text-center'>
                        {categories.find(cat => cat.id === selectedCategory)?.name} ({books.length} books)
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {books.map((item) => (
                            <Cards item={item} key={item.id}/>
                        ))}
                    </div>
                </div>
            )}

            {/* No Books State */}
            {!loading && !error && books.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No books found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        No books found in this category. Try selecting a different category.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Course