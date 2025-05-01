import "./App.css";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./pages/LandingPage";
import LoginButton from "./components/LoginButton";
function App() {
  const [loading, setLoading] = useState(true);
  const {loginWithPopup,loginWithRedirect,logout,user,isAuthenticated} = useAuth0();
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    // <Router>
    //   {/* {loading ? (
    //     <LoadingScreen />
    //   ) : ( */}
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //     </Routes>
    //   {/* )} */}
    // </Router>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/loginbutton" element={<LoginButton />} />

        {isAuthenticated && user && (
        <Route path="/login" element={<Login />} />
        )}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    // <div className="app">
    //   <button onClick={loginWithPopup}>Login with Popup</button>
    //   <button onClick={loginWithRedirect}>Login with Redirect</button>
    //   <button onClick={logout}>Logout</button>
    //   {isAuthenticated && user && (
    //     <div>
    //       <h1>Welcome, {user.name}</h1>
    //       <p>{user.email}</p>
    //     </div>
    //   )}
    // </div>
  );
}

export default App;
