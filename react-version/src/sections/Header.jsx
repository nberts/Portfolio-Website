import React from 'react';

function Header() {
    return (
        <header>
            <div className='titles'>
                <h1>Nina Bertrand</h1>
                <h2>Junior Developer</h2>
            </div>
            <nav className='page-menu'>
                <ul className='menu'>
                    <li className='about'>About</li>
                    <li className='portfolio'>Portfolio</li>
                    <li className='blog'>Blog</li>
                    <li className='contact'>Contact</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;