import './Footer.css';
import logo from '../../img/getawaylogo.svg';
import instagram from '../../img/instagram.svg';
import facebook from '../../img/facebook.svg';
import twitter from '../../img/twitter.svg';


export default function Footer() {
    return (
        <footer className="footer-content">
            <div className="footer-content-container">
                <div className="logo-section">
                    <img className="footer-logo" src={logo} alt="Logo"/>
                    <span className="logo-text">getaway</span>
                </div>
                <div className="footer-contact-container">
                    <span className="footer-contact-follow">Follow Us</span>
                    <div className="footer-follow-wrapper">
                        <a href="https://www.instagram.com/" className="footer-follow-link">
                            <img className="footer-follow-img" src={instagram} alt="Instagram Icon"/>
                        </a>
                        <a href="https://www.facebook.com/" className="footer-follow-link">
                            <img className="footer-follow-img" src={facebook} alt="Facebook Icon"/>
                        </a>
                        <a href="https://twitter.com/?lang=en" className="footer-follow-link">
                            <img className="footer-follow-img" src={twitter} alt="Twitter Icon"/>
                        </a>
                    </div>
                </div>    
            </div>
            {/* <!-- Line element --> */}
            <div className="footer-divider">
                <div className="footer-line"></div>
                <span className="footer-text">© 2024 getaway. All rights reserved.</span>
            </div>
        </footer>
    );
}
