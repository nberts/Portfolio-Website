import React from "react";

function Footer() {
    return (
        <footer>
            <div className="socials">
                <p>Connect with me on:</p>
                <ul className="social-links">
                    <li><a href="#" target="_blank" rel="noopener no referrer">GitHub</a></li>
                    <li><a href="#" target="_blank" rel="noopener no referrer">LinkedIn</a></li>
                    <li><a href="#" target="_blank" rel="noopener no referrer">Twitter</a></li>
                </ul>
            </div>
            <p>© {new Date().getFullYear()} Nina Bertrand | Designed & build with ☕ in London</p>
        </footer>
    );
}

export default Footer;