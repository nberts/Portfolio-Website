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