// Github Repo name formatting
const formatRepoName = (fullName) => {
  if (typeof fullName !== 'string' || fullName.length === 0) {
    return 'Unnamed Project';
  }
  
  const repoNameOnly = fullName.split('/')[1] || fullName;
  const words = repoNameOnly.split(/(?=[A-Z])|-|_/);
  
  return words
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// get current book from literal.club
async function getCurrentlyReading() {
  const username = 'nberts';
  const token = process.env.LITERAL_TOKEN;
  
  if (!token) {
    console.log('No Literal token found');
    return {
      text: "a good book...",
      url: `https://literal.club/${username}`
    };
  }
  
  try {
    // get profile ID
    const meQuery = `
      query {
        me {
          profile {
            id
            handle
          }
        }
      }
    `;
    
    const meResponse = await fetch('https://literal.club/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query: meQuery })
    });
    
    const meData = await meResponse.json();
    console.log('Me data:', meData);
    
    const profileId = meData?.data?.me?.profile?.id;
    
    if (!profileId) {
      console.log('Could not get profile ID');
      return {
        text: "a good book...",
        url: `https://literal.club/${username}`
      };
    }
    
    // get currently reading books
    const readingQuery = `
      query {
        booksByReadingStateAndProfile(
          limit: 1
          offset: 0
          readingStatus: IS_READING
          profileId: "${profileId}"
        ) {
          title
          slug
          authors {
            name
          }
        }
      }
    `;
    
    const booksResponse = await fetch('https://literal.club/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query: readingQuery })
    });
    
    const booksData = await booksResponse.json();
    console.log('Books data:', booksData);
    
    if (booksData?.data?.booksByReadingStateAndProfile?.length > 0) {
      const book = booksData.data.booksByReadingStateAndProfile[0];
      const authors = book.authors.map(a => a.name).join(', ');
      return {
        text: `${book.title} by ${authors}`,
        url: `https://literal.club/${username}`
      };
    }
    
  } catch (error) {
    console.error("Error fetching Literal data:", error);
  }
  
  return {
    text: "a good book...",
    url: `https://literal.club/${username}`
  };
}

// get recently played album from Spotify
async function getSpotifyRecentAlbum() {
  const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

  if (!SPOTIFY_REFRESH_TOKEN) {
    return "some great music";
  }

  try {
    //Get Access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN
      })
    });

    const { access_token } = await tokenResponse.json();

    //get recently played
    const recentResponse = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=10', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    if (recentResponse.ok) {
      const data = await recentResponse.json();

      if (data.items && data.items.length > 0) {
        const track = data.items[0].track;
        const albumName = track.album.name;
        const artistName = track.album.artists[0].name;
        const albumURL = track.album.external_urls.spotify;

        return {
          text: `${albumName} by ${artistName}`,
          url: albumURL
        };

      }
    }
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
  }

  return {
    text: "some great music",
    url: null
  }; 
}

// Main handler function
export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = 'nberts';
  
  // Default values
  let workingOn = { name: "Something cool!", url: null };
  let reading = { text: "a good book...", url: null };
  let listeningTo = "lofi hip hop radio";
  
  // Fetch GitHub data
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      console.error('GitHub API failed:', response.status, await response.text());
    }

    if (response.ok) {
      const events = await response.json();
      const pushEvent = events.find(event => event.type === 'PushEvent');
      
      if (pushEvent) {
        workingOn = {
          name: formatRepoName(pushEvent.repo.name),
          url: `https://github.com/${pushEvent.repo.name}`
        };
      }
    }
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
  }
  
  // Fetch Literal data
  reading = await getCurrentlyReading();
  console.log('Final reading data:', reading);
  
  listeningTo = await getSpotifyRecentAlbum();
  console.log('Final listening data', listeningTo)

  // Return all data
  res.status(200).json({
    workingOn,
    reading,
    listeningTo
  });
}