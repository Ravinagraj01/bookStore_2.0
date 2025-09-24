import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';

function FreeBook() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLatestBooks();
    }, []);

    const fetchLatestBooks = async () => {
        try {
            setLoading(true);
            // Fetch latest releases and popular books
            const response = await fetch(
                'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&maxResults=20'
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
            setError('Failed to fetch latest books');
            console.error('Error fetching books:', err);
        } finally {
            setLoading(false);
        }
    };

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    }

    if (loading) {
        return (
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
                <div className='mb-8'>
                    <h1 className='font-semibold text-xl pb-2'>Latest Book Releases</h1>
                    <p>Discover the newest and most popular books from around the world.</p>
                </div>
                <div className="flex justify-center items-center py-12">
                    <div className="loading loading-spinner loading-lg"></div>
                    <span className="ml-3">Loading latest books...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
                <div className='mb-8'>
                    <h1 className='font-semibold text-xl pb-2'>Latest Book Releases</h1>
                    <p>Discover the newest and most popular books from around the world.</p>
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
    <>
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
            <div className='mb-8'>
                <h1 className='font-semibold text-xl pb-2'>Latest Book Releases</h1>
                <p>Discover the newest and most popular books from around the world.</p>
            
        </div>
        <div>
        <div className="slider-container">
      <Slider {...settings}>
        {
            books.map((item)=>(
                <Cards item={item} key={item.id}/>
            ))
        }
      </Slider>
    </div>
    </div>
</div>
    </>
  )
}

export default FreeBook