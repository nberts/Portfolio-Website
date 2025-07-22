import React, { useState } from "react";

function Contact() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Form submitted:', { email, message });

        setEmail('');
        setMessage('');
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
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;