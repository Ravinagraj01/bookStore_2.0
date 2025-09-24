# Google Books API Integration + Sentiment Analysis

This project now includes integration with the Google Books API and a sentiment analysis system, allowing users to search and discover millions of books based on their mood.

## Features

- **Search Books**: Search for books by title, author, or any keyword
- **Authentication Required**: Only logged-in users can access the book search functionality
- **Responsive Design**: Search functionality works on both desktop and mobile devices
- **Rich Book Information**: Display book covers, titles, authors, descriptions, publication dates, and page counts
- **Latest Releases**: Home page shows newest book releases from Google Books
- **Featured Books**: Curated collection from multiple genres and categories
- **Category Browsing**: Browse books by genre in the Courses section
- **Real-time Data**: All book data comes directly from Google Books API
- **Mood-Based Recommendations**: Get personalized book suggestions based on your current mood
- **Speech Recognition**: Speak your mood and get instant book recommendations
- **Sentiment Analysis**: AI-powered mood detection from text input

## How It Works

### 1. Authentication
- Users must be logged in to access the book search functionality
- The search bar in the navigation only appears when a user is authenticated
- Unauthenticated users will be prompted to login when trying to access search features

### 2. Search Functionality
- **Desktop**: Search bar appears in the top-right navigation when logged in
- **Mobile**: Search form appears in the mobile menu when logged in
- Search queries are sent to the Google Books API
- Results are displayed in a responsive grid layout

### 3. Mood-Based Recommendations
- **Text Input**: Type how you're feeling
- **Speech Input**: Use voice recognition to describe your mood
- **Sentiment Analysis**: AI analyzes your text and determines mood (positive/negative/neutral)
- **Smart Queries**: System generates relevant search queries based on your mood
- **Real Books**: Fetches actual books from Google Books API matching your mood
- **Direct Links**: Click any book to go to its Google Books page

### 4. Book Display
Each book card shows:
- Book cover image (with fallback for missing images)
- Book title
- Author(s)
- Description (truncated if too long)
- Publication date
- Page count
- Direct links to Google Books for more details

## API Endpoints Used

- **Search Books**: `https://www.googleapis.com/books/v1/volumes?q={query}&maxResults=40`
- **Sentiment Analysis**: `POST /api/analyze` (local backend)
- **Mood Queries**: `GET /api/moods` (local backend)
- No API key required (Google Books API is free for basic usage)
- Maximum results per search: 40 books

## Components

### BookSearch.jsx
- Main search component displayed on the home page
- Only visible to authenticated users
- Includes search form and results display

### SearchPage.jsx
- Dedicated search results page
- Accessible via `/search?q={query}` route
- Handles URL parameters for search queries

### MoodRecommender.jsx
- **NEW**: Mood-based book recommendation system
- Integrates sentiment analysis with Google Books API
- Supports both text and speech input
- Displays real books with cover images and details
- Clickable book cards that redirect to Google Books

### FeaturedBooks.jsx
- Displays a curated collection of books from multiple categories
- Fetches books from fiction, romance, mystery, sci-fi, and fantasy genres
- Shows up to 12 randomly selected books for variety

### FreeBook.jsx (Updated)
- Now fetches latest book releases from Google Books API
- Shows newest fiction books instead of dummy database data
- Includes loading states and error handling

### Course.jsx (Updated)
- Replaced dummy database with Google Books API integration
- Added category filtering (Mystery, Romance, Sci-Fi, Fantasy, Biography, History, Self Help)
- Shows relevant books for each selected category
- Includes loading states and error handling

### Enhanced Cards.jsx
- Displays book information in a card format
- Handles both local book data and Google Books API data
- Responsive design with hover effects

## Sentiment Analysis System

### Backend (Express)
- **Package**: Uses `sentiment` npm package for text analysis
- **Route**: `/api/analyze` for POST requests with text input
- **Mood Detection**: 
  - Positive score → "positive" mood
  - Negative score → "negative" mood
  - Zero score → "neutral" mood
- **Smart Queries**: Generates relevant search terms for each mood
- **Google Books Integration**: Fetches real books based on mood queries

### Frontend (React)
- **Speech Recognition**: Web Speech API integration
- **Real-time Analysis**: Instant mood detection and book recommendations
- **Interactive UI**: Beautiful cards with book covers and information
- **Direct Navigation**: Click books to go to Google Books pages

## Usage

1. **Login to your account**
2. **Browse the home page** to see:
   - Latest book releases
   - Featured books from various genres
   - Search functionality for specific books
   - **NEW**: Mood-based book recommendations
3. **Use the Mood Recommender**:
   - Type or speak your current mood
   - Get instant sentiment analysis
   - View personalized book recommendations
   - Click any book to visit its Google Books page
4. **Use the search bar** in the navigation (desktop) or mobile menu
5. **Enter search terms** like:
   - Book titles: "Harry Potter"
   - Author names: "J.K. Rowling"
   - Keywords: "fantasy magic"
6. **Visit the Courses section** to browse books by category:
   - Mystery & Thriller
   - Romance
   - Science Fiction
   - Fantasy
   - Biography
   - History
   - Self Help
7. **View search results** with detailed book information
8. **Click "View Details"** to see more information on Google Books

## Technical Details

- Uses React Router for navigation
- Implements responsive design with Tailwind CSS
- Handles loading states and error messages
- Gracefully handles missing book data (images, descriptions, etc.)
- **NEW**: Sentiment analysis with real-time Google Books API integration
- **NEW**: Speech recognition for voice input
- **NEW**: Mood-based query generation and book fetching
- No external dependencies beyond React and React Router

## Mood-Based Recommendations

### Positive Mood
- Self-help motivation
- Happiness and positive thinking
- Success and personal development
- Inspiration and life purpose
- Mindfulness and meditation

### Negative Mood
- Mental health and depression
- Grief and loss healing
- Anxiety and stress management
- Resilience and overcoming adversity
- Therapy and counseling

### Neutral Mood
- Philosophy and thinking
- Science and popular science
- History and world history
- Biography and memoirs
- Business and strategy

## Future Enhancements

- Add filters for book categories, publication dates, etc.
- Implement pagination for large result sets
- Add book favorites/wishlist functionality
- Integrate with local book inventory
- Add advanced search options (ISBN, publisher, etc.)
- **NEW**: Expand mood categories and query generation
- **NEW**: Save mood history and book preferences
- **NEW**: Personalized reading recommendations based on mood patterns
