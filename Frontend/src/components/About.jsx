import React from "react";
import Navbar from "./Navbar";
import { FaBookOpen, FaHeart, FaUsers, FaLightbulb } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen  flex flex-col items-center text-white">
      <Navbar />
      
      <div className="max-w-4xl bg-base-300 bg-opacity-20 backdrop-blur-md p-10 shadow-xl rounded-lg mt-[100px] text-center m-8 border border-gray-600">
        <h1 className="text-4xl font-bold mb-4 text-white">About Us 📚</h1>
        
        <p className="text-gray-300 leading-relaxed">
          Welcome to <span className="font-semibold text-blue-400">Book Haven</span> – a paradise for book lovers! Our mission is to bring stories to life and provide an unparalleled reading experience to all.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <FaLightbulb className="text-yellow-400 text-4xl mb-2" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-gray-400 text-sm">To inspire and empower readers through books that educate, entertain, and enrich lives.</p>
          </div>

          <div className="flex flex-col items-center">
            <FaHeart className="text-red-400 text-4xl mb-2" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-gray-400 text-sm">To make books accessible to everyone and build a thriving community of book lovers.</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Why Choose Us? 🌟</h2>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <FaBookOpen className="text-blue-400 text-2xl" />
            <span className="text-gray-300">Vast collection of books</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaUsers className="text-green-400 text-2xl" />
            <span className="text-gray-300">A growing community of readers</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaHeart className="text-red-400 text-2xl" />
            <span className="text-gray-300">Curated recommendations just for you</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaLightbulb className="text-yellow-400 text-2xl" />
            <span className="text-gray-300">A seamless book-buying experience</span>
          </div>
        </div>

        <button className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-md text-lg hover:bg-pink-500 transition">
          Explore Books 📖
        </button>
      </div>
    </div>
  );
}
