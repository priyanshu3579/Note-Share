import React from 'react'
import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom"
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import Notes from './pages/Notes'
import { Auth0Provider } from '@auth0/auth0-react';
import AdminRoute from './components/AdminRoute'
import Admin from './pages/Admin'

const App = () => {
  return (
    <Auth0Provider
      domain="dev-lu0wqrhy3mhic0e0.us.auth0.com"
      clientId="veN5UWIH8DOQaQKEyyOhfu7cz5MZIOd6"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-lu0wqrhy3mhic0e0.us.auth0.com/api/v2/",
        scope: "openid profile email"
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/notes' element={<Notes />} />
          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        </Routes>
    </Auth0Provider>
  )
}

export default App
