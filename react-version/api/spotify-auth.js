export default function handler(req, res) {
    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

    if (!SPOTIFY_CLIENT_ID) {
        return res.status(500).send('Missing Spotify Client ID');
    }

    const redirect_uri = 'https://nina-portfolio-ecru.vercel.app/api/spotify-callback';
    const scopes = 'user-read-recently-played';



    const params = new URLSearchParams ({
        client_id: SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: redirect_uri,
        scope: scopes,
        show_dialog: 'true'
    });

    const authURL = `https://accounts.spotify.com/authorize?${params.toString()}`;

    console.log('Client ID:', SPOTIFY_CLIENT_ID)
    console.log('Full auth URL:', authURL)
    
    res.redirect(authURL);
}