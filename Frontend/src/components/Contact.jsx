import React from "react";
import Navbar from "./Navbar";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen  flex flex-col items-center text-white">
      <Navbar />
      
      <div className="max-w-3xl bg-base-300 bg-opacity-20 backdrop-blur-md p-8 m-12 shadow-xl rounded-lg mt-[100px] border border-gray-700">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">
          Get in Touch 📚
        </h2>
        
        <p className="text-gray-400 text-center mb-4">
          We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello, feel free to reach out.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <FaPhone className="text-blue-400" />
            <span className="text-gray-300">+91 123 456 7890</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-red-400" />
            <span className="text-gray-300">support@bookstore.com</span>
          </div>

          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-green-400" />
            <span className="text-gray-300">123, Book Street, Bangalore, India</span>
          </div>
        </div>

        <form className="mt-6 flex flex-col space-y-4">
          <input type="text" placeholder="Your Name" 
            className="p-3 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Your Email" 
            className="p-3 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea placeholder="Your Message" 
            className="p-3 border border-gray-600 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-500 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
