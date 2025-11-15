const App = () => {

  console.log("REDIRECT URI:", window.location.origin + window.location.pathname);

  return (
    <Auth0Provider
      domain="dev-lu0wqrhy3mhic0e0.us.auth0.com"
      clientId="veN5UWIH8DOQaQKEyyOhfu7cz5MZIOd6"
      authorizationParams={{
        redirect_uri: "https://priyanshu3579.github.io/Note-Share/",
        audience: "https://dev-lu0wqrhy3mhic0e0.us.auth0.com/api/v2/",
        scope: "openid profile email"
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={() => {}}
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/upload' element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path='/notes' element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
      </Routes>
    </Auth0Provider>
  );
};

export default App;
