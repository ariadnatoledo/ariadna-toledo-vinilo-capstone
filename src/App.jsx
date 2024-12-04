import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import ShowsPage from "./pages/ShowsPage/ShowsPage";
import Footer from "./components/Footer/Footer";
import PostDetails from "./components/PostDetails/PostDetails";
import axios from "axios";
import "./App.scss";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

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
      console.log(user);
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
      {location.pathname !== "/login" && (
        <HeaderNav loggedIn={loggedIn} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/post/:id" element={<PostDetails details={user} />} />
        <Route
          path="/profile/:username/messages"
          element={<MessagesPage user={user} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} error={error} />}
        />
        <Route path="/friends" element={<FriendsPage loggedInUserId={user.userId} />} />
        <Route path="/messages/:username" element={<MessagesPage loggedInUserId={user.userId}  />} />
        <Route path="/shows" element={<ShowsPage />} />
      </Routes>

      {location.pathname !== "/login" && !location.pathname.startsWith("/messages") && !location.pathname.startsWith("/profile") && !location.pathname.startsWith("/friends") && <Footer />} 
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
