import React, { useState, useEffect} from 'react';
import { FaLaptopCode, FaBookOpen, FaHeadphones } from 'react-icons/fa';

function Header() {
    const [status, setStatus] = useState({
        workingOn: { name: 'Loading...', url: null },
        reading: {name: 'Loading...', url: null},
        listeningTo: 'Loading...'
    });

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('/api/status');
                if (!response.ok) {
                    throw new Error('Failed to fetch status');
                }
                const data = await response.json();
                setStatus(data);
            } catch (error) {
                console.error("Error fetching status:", error);

                setStatus({
                    workingOn: { name: 'Could not load data', url: null},
                    reading: { name: 'Could not load data', url: null},
                    listeningTo: 'Could not load data'
                });
            }
        };

        fetchStatus();
    }, []);

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
                        <span>
                            <strong>Working on:</strong>{' '}
                            {status.workingOn && status.workingOn.url ? (
                                <a href={status.workingOn.url} target="_blank" rel="noopener noreferrer">
                                    {status.workingOn.name}
                                </a>
                            ) : (
                                status.workingOn?.name || 'Loading...' 
                            )}
                        </span>
                    </li>
                    <li>
                        <FaBookOpen />
                        <span>
                            <strong>Reading:</strong>{' '} 
                            {status.reading && status.reading.url ? (
                                <a href={status.reading.url} target="_blank" rel="noopener noreferrer">
                                    {status.reading.text}
                                </a>
                            ) : (
                                typeof status.reading.text || 'Loading...'
                            )}
                        </span>
                    </li>
                    <li>
                        <FaHeadphones />
                        <span><strong>Listening to:</strong> {status.listeningTo}</span>
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