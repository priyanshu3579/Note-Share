import React from 'react'
import { Link } from "react-router-dom";


const Main = () => {
  return (
        <main className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-140px)] px-6 py-16 
      bg-[repeating-linear-gradient(to_bottom,#f7fbff_0,#f7fbff_28px,#d0ebff_29px,#f7fbff_30px)]">

      {/* Intro Section */}
      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-3 drop-shadow">
          Welcome to Note Sharing Platform
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Upload, manage and access your notes anytime with ease and simplicity.
        </p>
      </section>

      {/* Buttons */}
      <section className="flex flex-wrap justify-center gap-6">
        
        <Link
          to="/upload"
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-3 rounded-lg shadow-md 
                     flex items-center gap-2 text-lg transition transform hover:-translate-y-1"
        >
          <i className="fas fa-upload"></i> Upload Notes
        </Link>

        <Link
          to="/notes"
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-3 rounded-lg shadow-md 
                     flex items-center gap-2 text-lg transition transform hover:-translate-y-1"
        >
          <i className="fas fa-folder-open"></i> View Notes
        </Link>

        <Link
          to="/profile"
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-3 rounded-lg shadow-md 
                     flex items-center gap-2 text-lg transition transform hover:-translate-y-1"
        >
          <i className="fas fa-user"></i> Profile
        </Link>

      </section>

      {/* Toast (UI only) */}
      <div
        id="toast"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#e0f0ff] text-[#004080] 
                   py-2 px-5 rounded-lg shadow opacity-0 transition-opacity duration-300 pointer-events-none"
      ></div>
    </main>
  )
}

export default Main