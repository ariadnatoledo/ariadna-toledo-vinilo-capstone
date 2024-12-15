import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { Link } from "react-router-dom";
import viniloIcon from "../../assets/logo/vinilo.png";
import menuIcon from "../../assets/icons/menu-24px.svg";
import "./HeaderNav.scss";

function HeaderNav({ loggedIn, handleLogout }) {
  const handleMenuClick = (action) => {
    switch (action) {
      case "Log out":
        handleLogout();
        break;
      default:
        console.log(`Navigating to ${action}...`);
    }
  };

  return (
    <header className="header-nav">
      <div className="header-nav__logo">
        <Link to="/">
          <img
            src={viniloIcon}
            alt="Vinilo Logo"
            className="header-nav__icon"
          />
        </Link>
      </div>

      {loggedIn ? (
        <>
          <div className="header-nav__mobile">
            <Dropdown>
              <MenuButton className="header-nav__menu-button">
              <img
                  src={menuIcon}
                  alt="Menu Icon"
                  className="header-nav__menu-icon"
                />
              </MenuButton>
              <Menu className="header-nav__menu">
                <Link to="/profile" className="header-nav__menu-item">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link to="/friends" className="header-nav__menu-item">
                  <MenuItem>My Friends</MenuItem>
                </Link>
                <Link to="/shows" className="header-nav__menu-item">
                  <MenuItem>Shows</MenuItem>
                </Link>
                <MenuItem
                  className="header-nav__menu-item"
                  onClick={() => handleMenuClick("Log out")}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Dropdown>
          </div>

          <nav className="header-nav__links">
            <Link to="/profile">Profile</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/shows">Shows</Link>
            <button className= "header-logout" onClick={handleLogout}>Logout</button>
          </nav>
        </>
      ) : (
        <>
          <div className="header-nav__mobile">
            <Link to="/login" className="header-nav__menu-button">
              SIGN IN
            </Link>
          </div>

          <nav className="header-nav__links">
            <Link to="/login">SIGN IN</Link>
          </nav>
        </>
      )}
    </header>
  );
}

export default HeaderNav;
