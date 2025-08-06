export default function handler(req, res) {
    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const redirect_uri = 'https://nina-portfolio-ecru.vercel.app/api/spotify-callback';

    const scopes = 'user-read-recently-played';

    const authURL = 'https://accounts.spotify.com/authorize' +
        `client_id=${SPOTIFY_CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirect_uri)}` +
        `&scope=${encodeURIComponent(scopes)}` +
        `&show_dialog=true`;

    console.log('Redirecting to:', authURL)
    res.redirect(authURL);
}