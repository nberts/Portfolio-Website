import React from 'react';
import profilePicture from '../assets/images/profilpic.jpeg';

function About() {
    return (
        <div className='about-section'>
            <div className='profile-container'>
                <img className='profile-pic' src={profilePicture} alt='Profile Picture'/>
            </div>
            <div className='about-content'>
                <h2>About Me</h2>
                <p>
                    Hi there! I'm a Junior Developer based in London, with a passion for
                    creating clean, intuitive web experiences. With a background in marketing
                    and a natural eye for design, I bring a unique perspective to
                    development that bridges the gap between user needs and technical
                    solutions. I specialize in crafting responsive websites and applications
                    that not only function flawlessly but also engage and delight users.
                </p>
                <div className='about-grid'>
                    <div className='skill-box'>
                        <h3>Frontend</h3>
                        <p>HTML, CSS, JavaScript, React.js</p>
                    </div>
                    <div className='skill-box'>
                        <h3>Design</h3>
                        <p>Responsive Design, UI/UX, Figma</p>
                    </div>
                    <div className='skill-box'>
                        <h3>Backend</h3>
                        <p>Node.js, API Integration</p>
                    </div>
                    <div className='skill-box'>
                        <h3>Tools</h3>
                        <p>Git, VS Code, Chrome DevTools</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;