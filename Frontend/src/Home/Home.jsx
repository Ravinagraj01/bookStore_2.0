import React from 'react'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FreeBook from '../components/FreeBook'
import BookSearch from '../components/BookSearch'
import FeaturedBooks from '../components/FeaturedBooks'
import MoodRecommender from '../components/MoodRecommender'

function Home() {
  return (
    <div>
       <Navbar/>
       <Banner/>
       <BookSearch/>
       <MoodRecommender/>
       <FeaturedBooks/>
       <FreeBook/>
       <Footer/>
    </div>
  )
}

export default Home