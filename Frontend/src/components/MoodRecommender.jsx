import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MoodRecommender() {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isSupported, setIsSupported] = useState(false);
    
    const recognitionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if speech recognition is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setIsSupported(true);
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setError('');
            };

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setText(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                setError(`Speech recognition error: ${event.error}`);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const startListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch (error) {
                setError('Failed to start speech recognition');
            }
        }
    };

    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            setError('Please enter some text or speak to describe your mood');
            return;
        }

        setIsAnalyzing(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('http://localhost:8000/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text.trim() }),
            });

            const data = await response.json();

            if (data.success) {
                setResult(data.data);
            } else {
                setError(data.message || 'Failed to analyze sentiment');
            }
        } catch (error) {
            setError('Failed to connect to the server. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleBookClick = (book) => {
        // Navigate to Google Books page
        if (book.infoLink) {
            window.open(book.infoLink, '_blank');
        } else if (book.previewLink) {
            window.open(book.previewLink, '_blank');
        }
    };

    const getMoodEmoji = (mood) => {
        switch (mood) {
            case 'positive':
                return '😊';
            case 'negative':
                return '😔';
            case 'neutral':
                return '😐';
            default:
                return '🤔';
        }
    };

    const getMoodColor = (mood) => {
        switch (mood) {
            case 'positive':
                return 'text-green-600 bg-green-100';
            case 'negative':
                return 'text-red-600 bg-red-100';
            case 'neutral':
                return 'text-blue-600 bg-blue-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-8'>
            <div className='mb-8'>
                <h1 className='font-semibold text-3xl pb-4'>Mood-Based Book Recommendations</h1>
                <p className='text-gray-600 dark:text-gray-400'>
                    Tell us how you're feeling today, and we'll recommend the perfect books for your mood. 
                    You can type or speak your thoughts!
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                {/* Input Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="moodText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                How are you feeling today?
                            </label>
                            <div className="flex gap-2">
                                <textarea
                                    id="moodText"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Describe your mood, thoughts, or how your day is going..."
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                                    rows="4"
                                    disabled={isListening}
                                />
                                {isSupported && (
                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="button"
                                            onClick={isListening ? stopListening : startListening}
                                            disabled={isAnalyzing}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                                isListening
                                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {isListening ? '🛑 Stop' : '🎤 Speak'}
                                        </button>
                                        {isListening && (
                                            <div className="text-xs text-center text-gray-500">
                                                Listening...
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={!text.trim() || isAnalyzing || isListening}
                            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isAnalyzing ? 'Analyzing...' : 'Get Book Recommendations'}
                        </button>
                    </form>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <div className="flex">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div className="ml-3">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Display */}
                {result && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <div className="text-center mb-6">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${getMoodColor(result.mood)}`}>
                                <span className="text-2xl mr-2">{getMoodEmoji(result.mood)}</span>
                                Your Mood: {result.mood.charAt(0).toUpperCase() + result.mood.slice(1)}
                            </div>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Sentiment Score: {result.sentimentScore}
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Your Input:</h3>
                            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                "{result.text}"
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Recommended Books:</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {result.recommendedBooks.map((book, index) => (
                                    <div 
                                        key={book.id || index} 
                                        className="bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-600"
                                        onClick={() => handleBookClick(book)}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-start space-x-3">
                                                <img 
                                                    src={book.image} 
                                                    alt={book.title}
                                                    className="w-16 h-20 object-cover rounded-md flex-shrink-0"
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/128x192?text=No+Image';
                                                    }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                                                        {book.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                                        by {book.authors}
                                                    </p>
                                                    {book.publishedDate && (
                                                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                                                            {book.publishedDate}
                                                        </p>
                                                    )}
                                                    {book.pageCount && (
                                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                                            {book.pageCount} pages
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {book.description && (
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">
                                                    {book.description}
                                                </p>
                                            )}
                                            <div className="mt-3 flex justify-between items-center">
                                                <span className="text-xs text-pink-500 font-medium">
                                                    Click to view details →
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    📚
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {result.message}
                            </p>
                        </div>
                    </div>
                )}

                {/* Speech Recognition Not Supported */}
                {!isSupported && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <p className="text-sm text-yellow-800">
                            Speech recognition is not supported in your browser. You can still type your mood!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MoodRecommender;
