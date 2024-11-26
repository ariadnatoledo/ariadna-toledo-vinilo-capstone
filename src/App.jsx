import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage"; 
import AboutPage from "./pages/AboutPage/AboutPage";
import ShowsPage from "./pages/ShowsPage/ShowsPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import axios from "axios";
import "./App.scss";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /*
   * Component Mount, if JWT token is set the user is still considered logged in
   */
  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3306/user", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setLoggedIn(true);
        setUser(response.data); 
      } catch (err) {
        console.error(err.response?.data?.message || "Error getting user data");
        setError("Error getting user data");
        localStorage.removeItem("token");
        setLoggedIn(false); 
        navigate("/login"); 
      }
    };

    if (token) {
      getUserData();
    }
  }, [navigate]);

  /*
   * Login with username and password, creates JWT token saved in localStorage to persist login
   */
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3306/login", {
        email,
        password,
      });
  
      const { token, user } = response.data;
      localStorage.setItem("token", token); 
      setLoggedIn(true);
      setUser(user);
      setError("");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data?.message || "Error logging in");
      setError("Invalid email or password");
    }
  };



  /*
   * Logout of application, clears localStorage JWT token and sets state to logged out
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUser({});
    navigate("/login"); 
  };

  return (
    <div className="App">
      <HeaderNav loggedIn={loggedIn} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/profile/:username/messages" element={<MessagesPage user={user} />} />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} error={error} />}/>
           <Route path="/about" element={<AboutPage />} /> 
           <Route path="/shows" element={<ShowsPage />} /> 
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
