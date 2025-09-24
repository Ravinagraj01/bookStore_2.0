import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MoodRecommender from './MoodRecommender';

function MoodRecommenderPage() {
    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <MoodRecommender />
            </div>
            <Footer />
        </div>
    );
}

export default MoodRecommenderPage;
