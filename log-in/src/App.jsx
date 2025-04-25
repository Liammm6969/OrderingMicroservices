import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useState, useEffect } from "react";
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    <Router>
      {/* {loading ? (
        <LoadingScreen />
      ) : ( */}
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      {/* )} */}
    </Router>
  );
}

export default App;
