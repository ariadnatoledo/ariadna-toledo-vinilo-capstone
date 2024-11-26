import { Link } from "react-router-dom";
import viniloIcon from "../../assets/images/vinilo-2.jpeg";
import "./HeaderNav.scss";

function HeaderNav({ loggedIn, handleLogout }) {
  return (
    <header className="header-nav">
      <div className="header-nav__logo">
      <Link to="/">
        <img src={viniloIcon} alt="Vinilo Logo" className="header-nav__icon" />
        </Link>
      </div>
      <nav className="header-nav__links">
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


