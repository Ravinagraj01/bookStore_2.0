# 📚 Bookstore App

A full-stack Bookstore web application built with the MERN stack. Users can explore books, receive mood-based recommendations, and manage authentication, with book data sourced from a local MongoDB database and the Google Books API.

---

## 🚀 Features

- **Modern UI**: Responsive, clean, and minimalistic interface using React and TailwindCSS.
- **User Authentication**: Secure signup and login functionality.
- **Book Listing**: Browse books from local database and Google Books API.
- **Search**: Search for books by title, author, or keyword (authentication required).
- **Category Browsing**: Filter books by genre in the Courses section.
- **Featured & Latest Books**: Curated and newest releases displayed on the homepage.
- **Mood-Based Recommendations**: AI-powered sentiment analysis for personalized book suggestions.
- **Speech Recognition**: Voice input for mood-based recommendations.
- **Error Handling**: Graceful handling of missing data and API errors.

---

## 🛠 Tech Stack

- **Frontend**: React, TailwindCSS, DaisyUI, React Router, Axios
- **Backend**: Node.js, Express.js, Mongoose, Sentiment
- **Database**: MongoDB
- **APIs**: Google Books API

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/bookstore-app.git
cd bookstore-app
```

### 2. Backend Setup

```sh
cd Backend
npm install
cp .env.example .env   # Set your MongoDB URI and PORT
npm start
```

### 3. Frontend Setup

```sh
cd ../Frontend
npm install
npm run dev
```

### 4. Access the App

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:8000](http://localhost:8000)

---

## 📖 Usage

1. **Sign Up / Login** to access search and personalized features.
2. **Browse Home Page** for featured and latest books.
3. **Search Books** using the navigation bar (requires login).
4. **Get Mood-Based Recommendations** by typing or speaking your mood.
5. **Explore Courses** to browse books by category.
6. **View Details**: Click any book card to visit its Google Books page.

---

## 🗂 Project Structure

```
Backend/
  controller/
  model/
  route/
  .env
  index.js
  package.json

Frontend/
  src/
    components/
    context/
    courses/
    Home/
    App.jsx
    main.jsx
    index.css
  public/
  index.html
  package.json
```

---

## 🌐 API Endpoints

- **User Authentication**
  - `POST /user/signup`
  - `POST /user/login`
- **Book Listing**
  - `GET /book/`
- **Sentiment Analysis & Mood Recommendations**
  - `POST /api/analyze`
  - `GET /api/moods`
- **Google Books API**
  - `GET https://www.googleapis.com/books/v1/volumes?q={query}`

---

## 🤖 Mood-Based Recommendations

- **Positive**: Motivation, happiness, inspiration, mindfulness, romance, comedy.
- **Negative**: Mental health, grief, anxiety, resilience, therapy.
- **Neutral**: Philosophy, science, history, biography, business.

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

- [Ravi N](https://github.com/Ravinagraj01)

---

## 📬 Contact

For questions or support, email: support@bookstore.com

---

## 📢 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📚 Acknowledgements

- [Google Books API](https://developers.google.com/books)
- [Sentiment npm package](https://www.npmjs.com/package/sentiment)
