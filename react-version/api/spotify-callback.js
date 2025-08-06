export default async function handler(req, res) {
    const {code } = req.query;
    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const redirect_uri = 'https://nina-portfolio.vercel.app/api/spotify-callback';

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri
            })
        });

        const data = await response.json();

        res.send(`
            <html>
                <body style="font-family: monospace; padding: 40px;">
                    <h2>Success! Your Spotify Refresh Token: </h2>
                    <p style="background: #f0f0f0; padding: 20px; word-break: break-all;">
                        ${data.refresh_token}
                    </p>
                    <p> Add this to your .env.local file as:</p>
                    <code style="background: #f0f0f0; padding: 10px; display: block;">
                        SPOTIFY_REFRESH_TOKEN=${data.refresh_token}
                    </code>
                </body>
            </html>
        `);
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
}