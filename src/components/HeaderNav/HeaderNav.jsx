import { Link } from "react-router-dom";
import "./HeaderNav.scss";

function HeaderNav({ loggedIn, handleLogout }) {
  return (
    <header className="header-nav">
      <h1>Vinilo</h1>
      <nav>
        {loggedIn ? (
          <>
            <Link to="/about">About</Link>
            <Link to="/shows">Shows</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default HeaderNav;
