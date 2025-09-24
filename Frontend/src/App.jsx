import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Home/Home'
import './App.css'
import Courses from './courses/courses'
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider'
import Contact from './components/Contact'
import About from './components/About'
import SearchPage from './components/SearchPage'
import MoodRecommenderPage from './components/MoodRecommenderPage'


// import { Toaster } from 'react-hot-toast';

function App() {
  const [authUser, setAuthUser] = useAuth()

  return (
    <Router>  {/* ✅ Wrap everything inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={authUser?<Courses />:<Navigate to="/signup"></Navigate>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mood" element={<MoodRecommenderPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Toaster/> */}
    </Router>
  )
}

export default App
