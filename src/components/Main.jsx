import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Main = () => {

  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleProtectedClick = (path) => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: path }
      });
    } else {
      navigate(path);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-140px)] px-6 py-16 
      bg-[repeating-linear-gradient(to_bottom,#f7fbff_0,#f7fbff_28px,#d0ebff_29px,#f7fbff_30px)]">

      <section className="max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-3 drop-shadow">
          Welcome to Note Sharing Platform
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Upload, manage and access your notes anytime with ease and simplicity.
        </p>
      </section>

      <section className="flex flex-wrap justify-center gap-6">
        
        <button
          onClick={() => handleProtectedClick("/upload")}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-3 rounded-lg shadow-md 
                     flex items-center gap-2 text-lg transition transform hover:-translate-y-1"
        >
          <i className="fas fa-upload"></i> Upload Notes
        </button>

        <button
          onClick={() => handleProtectedClick("/notes")}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-3 rounded-lg shadow-md 
                     flex items-center gap-2 text-lg transition transform hover:-translate-y-1"
        >
          <i className="fas fa-folder-open"></i> View Notes
        </button>

        <button
          onClick={() => handleProtectedClick("/profile")}
          className="bg-[#17a2b8] hover:bg-[#138496] text-white px-6 py-3 rounded-lg shadow-md 
                     flex items-center gap-2 text-lg transition transform hover:-translate-y-1"
        >
          <i className="fas fa-user"></i> Profile
        </button>

      </section>

    </main>
  );
};

export default Main;
