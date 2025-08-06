import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
    return (
        <footer>
            <div className="socials">
                <p>Connect with me on:</p>
                <ul className="social-links">
                    <li>
                        <a href="https://github.com/nberts" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                        </a>
                    </li>    
                    <li>
                        <a href="https://www.linkedin.com/in/ninabertrand/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/nina.codes.sometimes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                        </a>
                    </li>
                    <li>
                        <a href="https://x.com/xNins_terx" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaTwitter />
                        </a>
                    </li>
                </ul>
            </div>
            <p>© {new Date().getFullYear()} Nina Bertrand | Designed & build with ☕ in Ottawa</p>
        </footer>
    );
}

export default Footer;