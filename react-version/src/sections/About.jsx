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
                Hi there! I'm a Junior Developer based in Ottawa, Canada, with a passion for creating clean, 
                intuitive web experiences. Coming from a background in public service and corporate security, 
                I bring a unique perspective to development that values both functionality and user safety. I 
                fell in love with frontend development and design, but I'm equally fascinated by understanding 
                how everything works under the hood. My approach to coding is simple: make time when you can, 
                take breaks when you need them, and always stay curious. Currently, I'm on a learning journey 
                focused on building projects that interest me, and I share my experiences through my blog about 
                coding as a parent. Because who says you can't debug code and life at the same time?
                </p>
                <div className='about-grid'>
                    <div className='skill-box'>
                        <h3>Frontend</h3>
                        <p>HTML, CSS, JavaScript, React.js, Responsive Design</p>
                    </div>
                    <div className='skill-box'>
                        <h3>Design & Creative</h3>
                        <p>Adobe Suite, UI/UX Design, Figma</p>
                    </div>
                    <div className='skill-box'>
                        <h3>Developer Tools</h3>
                        <p>Git & GitHub, VS Code, Vercel Deployment</p>
                    </div>
                    <div className='skill-box'>
                        <h3>API Integration & Data</h3>
                        <p>OAuth Authentication, Environment Variables, JSON data handling</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;