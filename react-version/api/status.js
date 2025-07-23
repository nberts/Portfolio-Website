const formatRepoName = (fullName) => {
    if (typeof fullName !== 'string' || fullName.length === 0) {
        return 'Unnamed Project';
    }
    const repoNameOnly = fullName.split('/') [1] || fullName;

    const words = repoNameOnly.split(/(?=[A-Z])|[-_]/);
    return words
    .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default async function handler(req, res) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_USERNAME = 'nberts';
    const GITHUB_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/events/public`;

    try {
        const githubResponse = await fetch(GITHUB_ENDPOINT, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'User-Agent': 'Nina-Portfolio-API'
            }
        });

        if (!githubResponse.ok) {
            throw new Error(`GitHub API responded with ${githubResponse.status}`);
        }

        const githubEvents = await githubResponse.json();
        const latestPushEvent = githubEvents.find(event => event.type === 'PushEvent');

        let workingOn = { name:"Something Cool!", url: null };

        if (latestPushEvent) {
            workingOn = {
                name: formatRepoName(latestPushEvent.repo.name),
                url: `https://github.com/${latestPushEvent.repo.name}`
            };
        }

        res.status(200).json({
            workingOn: workingOn,
            reading: "Fetching from Goodreds...", //placeholder
            listeningTo: "Fetching from Spotify..." //placeholder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching data from GitHub.",
            error: error.message,
        });
    }
}