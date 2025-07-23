import React from 'react';
import { FaLaptopCode, FaBookOpen, FaHeadphones } from 'react-icons/fa';

function Header() {
    return (
        <header>
            <div className='titles'>
                <div className='title-main'>
                    <h1>Nina Bertrand</h1>
                    <h2>Junior Developer</h2>
                </div>

                <ul className='currently-list'>
                    <li>
                        <FaLaptopCode />
                        <span><strong>Working on:</strong> A new React-based component library</span>
                    </li>
                    <li>
                        <FaBookOpen />
                        <span><strong>Reading:</strong> House of Salt & Sorrows by Erin A. Craig</span>
                    </li>
                    <li>
                        <FaHeadphones />
                        <span><strong>Listening to:</strong> Lo-fi study beats.</span>
                    </li>
                </ul>
            </div>

            <nav className='page-menu'>
                <ul className='menu'>
                    <li><a href='#about'>About</a></li>
                    <li><a href='#portfolio'>Portfolio</a></li>
                    <li><a href='#blog'>Blog</a></li>
                    <li><a href='#contact'>Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;