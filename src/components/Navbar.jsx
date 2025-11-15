import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {

  const navigate = useNavigate();

  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  // COMMON PROTECTED CLICK HANDLER
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
    <header className="w-full bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            NoteShare
          </Link>

          {/* MOBILE SECTION */}
          <div className="md:hidden relative">

            <input type="checkbox" id="nav-toggle" className="peer hidden" />

            {/* Hamburger */}
            <label
              htmlFor="nav-toggle"
              className="cursor-pointer p-2 rounded-md hover:bg-white/10"
            >
              <i className="fas fa-bars text-xl"></i>
            </label>

            {/* MOBILE MENU */}
            <div
              className="absolute right-0 mt-2 w-48 bg-[#1d2c33] rounded-lg shadow-lg hidden 
                peer-checked:block transition-all z-50"
            >
              <div className="flex flex-col p-3 space-y-3">

                {/* Greeting */}
                {isAuthenticated && (
                  <p className="text-[#38ef7d] font-semibold">
                    Hello {user.name}
                  </p>
                )}

                <button
                  onClick={() => handleProtectedClick("/")}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10"
                >
                  <i className="fa-solid fa-house"></i> Home
                </button>

                {/* Upload */}
                <button
                  onClick={() => handleProtectedClick("/upload")}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10"
                >
                  <i className="fas fa-upload"></i> Upload
                </button>

                {/* Notes */}
                <button
                  onClick={() => handleProtectedClick("/notes")}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10"
                >
                  <i className="fas fa-book"></i> Notes
                </button>

                {/* Profile */}
                <button
                  onClick={() => handleProtectedClick("/profile")}
                  className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10"
                >
                  <i className="fas fa-user"></i> Profile
                </button>

                {/* Admin */}
                {isAuthenticated &&
                  user?.["https://noteshare.com/roles"]?.includes("admin") && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-yellow-300"
                    >
                      <i className="fas fa-tools"></i> Admin
                    </Link>
                  )}

                {/* Login */}
                {!isAuthenticated && (
                  <button
                    onClick={() => loginWithRedirect()}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10"
                  >
                    <i className="fas fa-sign-in-alt"></i> Login
                  </button>
                )}

                {/* Logout */}
                {isAuthenticated && (
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 text-red-400"
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                )}

              </div>
            </div>

          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">

            <button
              onClick={() => handleProtectedClick("/")}
              className="hover:text-[#38ef7d] font-medium"
            >
              <i className="fa-solid fa-house"></i>  Home
            </button>

            {/* Upload */}
            <button
              onClick={() => handleProtectedClick("/upload")}
              className="hover:text-[#38ef7d] font-medium"
            >
            <i className="fas fa-upload"></i> Upload  
            </button>

            {/* Notes */}
            <button
              onClick={() => handleProtectedClick("/notes")}
              className="hover:text-[#38ef7d] font-medium"
            >
              <i className="fas fa-book"></i> Notes
            </button>

            {/* Profile */}
            <button
              onClick={() => handleProtectedClick("/profile")}
              className="hover:text-[#38ef7d] font-medium"
            >
              <i className="fas fa-user"></i>  Profile
            </button>

            {/* Admin */}
            {isAuthenticated &&
              user?.["https://noteshare.com/roles"]?.includes("admin") && (
                <Link
                  to="/admin"
                  className="cursor-pointer font-semibold text-yellow-300 hover:text-yellow-200"
                >
                <i className="fas fa-tools"></i>  Admin
                </Link>
              )}

              {/* Greeting (Desktop) */}
              {isAuthenticated && (
                <p className="font-semibold text-[#38ef7d]">
                  Hello {user.name}
                </p>
              )}


            {/* Login / Logout */}
            {isAuthenticated ? (
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="cursor-pointer flex items-center gap-2 hover:text-red-500"
              >
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="cursor-pointer flex items-center gap-2 hover:text-[#38ef7d]"
              >
                <i className="fas fa-sign-in-alt"></i> Login
              </button>
            )}
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
