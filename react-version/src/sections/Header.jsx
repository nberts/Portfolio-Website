import React from 'react';

function Header() {
    return (
        <header>
            <div className='titles'>
                <h1>Nina Bertrand</h1>
                <h2>Junior Developer</h2>

                <ul className='currently-list'>
                    <li><strong>Working on:</strong> A new React-based component library</li>
                    <li><strong>Reading:</strong> House of Salt & Sorrows by Erin A. Craig</li>
                    <li><strong>Listening to:</strong> Lo-fi study beats.</li>
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