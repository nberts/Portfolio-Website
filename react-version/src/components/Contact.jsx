import React, { useState } from "react";

function Contact() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('Sending...')

        try {
            const response = await fetch('https://formspree.io/f/mgvzapkr', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, message }),
            });

            if (response.ok) {
                setStatus('Thanks for your message!');
                setEmail('');
                setMessage('');
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus('Oops! There was a problem submitting your form.');
        }
    };

    return (
        <div className="contact-section">
            <h2>Let's Connect</h2>
            <p>Interested in collaborating or just want to say hi?</p>

            <form className="contact-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Your email address..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                    placeholder="Your message..."
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button type="submit" disabled={status === 'Sending...'}>
                    {status === 'Sending...' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            {status && <p className="form-status">{status}</p>}
        </div>
    );
}

export default Contact;