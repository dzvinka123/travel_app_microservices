import './Navbar.css';
import logo from '../../img/getawaylogo.svg';
import language from '../../img/language.svg';
import campingDark from '../../img/camping-dark.svg';
import { useAuth } from "../../session/AuthContext";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const path = "/"
  const { logout } = useAuth();
  return (
    <header className="header-container">
      <div className="header-left-elements">
        <a className="logo-section" href="/">
          <img className="header-logo" src={logo} alt="Logo" />
          <span className="logo-text">getaway</span>
        </a>
        <nav className="header-navbar-options">
          <a href="/journeys" className="header-nav-link">
            <img
              className="header-nav-img"
              src={campingDark}
              alt="Camping Icon"
            />
            <span className="nav-text">Journeys</span>
          </a>
        </nav>
      </div>
      <div className="header-right-elements">
        <div className="header-select">
          <img
            className="header-language-icon"
            src={language}
            alt="Language Icon"
          />
          <select className="header-language-select">
            <option>En</option>
            <option>Ua</option>
          </select>
        </div>
        {/* <button onClick={logout} className="header-item-user-button">
          <img className="header-user-icon" src={user} alt="User Icon" aria-hidden="true" />
        </button> */}
        <Link onClick={logout} to={path} className="header__loginbutton">Log out</Link>
      </div>
    </header>
  );
}
