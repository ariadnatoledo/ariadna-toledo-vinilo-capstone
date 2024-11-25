import { NavLink } from "react-router-dom";
import "./HeaderNav.scss";

function HeaderNav({ loggedIn, handleLogout }) {
  return (
    <header className="header-nav">
      <div className="header-nav__wrapper">
        <h1 className="header-nav__title">Vinilo</h1>
        {loggedIn && (
          <nav className="header-nav__nav">
            <NavLink className="header-nav__link" to="/">
              Home
            </NavLink>

            <NavLink className="header-nav__link" to="/profile">
              Profile
            </NavLink>
            <button className="header-nav__link" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default HeaderNav;