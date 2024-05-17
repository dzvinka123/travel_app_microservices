import logo from "../../img/getawaylogo.svg";
import language from "../../img/language.svg";
import "./NavbarLogin.css";

export default function NavbarLogin() {
  return (
    <header className="header-container-login">
      <div className="header-left-elements">
        <a className="logo-section" href="/home">
          <img className="header-logo" src={logo} alt="Logo" />
          <span className="logo-text">getaway</span>
        </a>
      </div>
      <div className="header-center-elements"></div>
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
      </div>
    </header>
  );
}
