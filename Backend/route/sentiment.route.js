import express from 'express';
import Sentiment from 'sentiment';

const router = express.Router();
const sentiment = new Sentiment();

// Mood-based search queries for Google Books API
const moodQueries = {
    positive: [
        'self-help motivation',
        'happiness positive thinking',
        'success personal development',
        'inspiration life purpose',
        'mindfulness meditation',
        'creativity art',
        'adventure travel',
        'romance love stories',
        'comedy humor',
        'children books happy'
    ],
    negative: [
        'mental health depression',
        'grief loss healing',
        'anxiety stress management',
        'resilience overcoming adversity',
        'therapy counseling',
        'mindfulness stress relief',
        'self-compassion healing',
        'trauma recovery',
        'emotional healing',
        'depression help'
    ],
    neutral: [
        'philosophy thinking',
        'science popular science',
        'history world history',
        'biography memoirs',
        'business strategy',
        'psychology human behavior',
        'sociology society',
        'economics finance',
        'technology innovation',
        'education learning'
    ]
};

// Analyze sentiment and return mood-based recommendations
router.post('/analyze', async (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text || typeof text !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'Text is required and must be a string'
            });
        }

        // Analyze sentiment
        const result = sentiment.analyze(text);
        const score = result.score;
        
        // Determine mood based on score
        let mood;
        if (score > 0) {
            mood = 'positive';
        } else if (score < 0) {
            mood = 'negative';
        } else {
            mood = 'neutral';
        }

        // Get search queries for the mood
        const searchQueries = moodQueries[mood] || moodQueries.neutral;
        
        // Fetch books from Google Books API based on mood
        const recommendedBooks = await fetchBooksForMood(searchQueries);

        // Get additional sentiment details
        const sentimentDetails = {
            score: score,
            comparative: result.comparative,
            tokens: result.tokens.length,
            words: result.words,
            positive: result.positive,
            negative: result.negative
        };

        res.json({
            success: true,
            data: {
                text: text,
                mood: mood,
                sentimentScore: score,
                sentimentDetails: sentimentDetails,
                recommendedBooks: recommendedBooks,
                message: `Based on your text, your mood appears to be ${mood}. Here are some books that might help!`
            }
        });

    } catch (error) {
        console.error('Sentiment analysis error:', error);
        res.status(500).json({
            success: false,
            message: 'Error analyzing sentiment',
            error: error.message
        });
    }
});

// Fetch books from Google Books API based on mood queries
async function fetchBooksForMood(searchQueries) {
    const allBooks = [];
    
    try {
        // Fetch books from multiple queries to get variety
        for (const query of searchQueries.slice(0, 3)) { // Use first 3 queries
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5&orderBy=relevance`
                );
                
                if (response.ok) {
                    const data = await response.json();
                    if (data.items) {
                        const formattedBooks = data.items.map(book => ({
                            id: book.id,
                            title: book.volumeInfo.title,
                            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author',
                            image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image',
                            description: book.volumeInfo.description || 'No description available',
                            publishedDate: book.volumeInfo.publishedDate,
                            pageCount: book.volumeInfo.pageCount,
                            categories: book.volumeInfo.categories || [],
                            previewLink: book.volumeInfo.previewLink,
                            infoLink: book.volumeInfo.infoLink,
                            googleBooksId: book.id
                        }));
                        allBooks.push(...formattedBooks);
                    }
                }
            } catch (err) {
                console.error(`Error fetching books for query "${query}":`, err);
            }
        }
        
        // Remove duplicates and limit to 12 books
        const uniqueBooks = allBooks.filter((book, index, self) => 
            index === self.findIndex(b => b.id === book.id)
        );
        
        return uniqueBooks.slice(0, 12);
        
    } catch (error) {
        console.error('Error fetching books for mood:', error);
        return [];
    }
}

// Get all mood-based search queries
router.get('/moods', (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                moods: Object.keys(moodQueries),
                moodQueries: moodQueries
            }
        });
    } catch (error) {
        console.error('Error fetching moods:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching mood information',
            error: error.message
        });
    }
});

export default router;
