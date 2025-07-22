import React, { useState, useEffect} from "react";
import BlogPost from "../components/BlogPost";

function Blog() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fninacodessometimes.substack.com%2Ffeed');

                if(!response.ok) {
                    throw new Error('Failed to fetch blog posts.');
                }

                const data = await response.json();

                if (data.status === 'ok') {
                    setPosts(data.items);
                } else {
                    throw new Error('Error in RSS feed data.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div className="blog-section"><h2>Blog</h2><p>Loading posts...</p></div>;
    }

    if (error) {
        return <div className="blog-section"><h2>Blog Section</h2><p>Error: {error}</p></div>;
    }

    return (
        <div className="blog-section">
            <h2>Blog</h2>
            <div className="blog-list">
                {posts.slice(0,3).map(post => (
                    <BlogPost
                    key={post.guid}
                    title={post.title}
                    excerpt={post.description}
                    link={post.link}
                    />
                ))}
            </div>

            <div className="see-all-container">
                <a
                href="https://ninacodessometimes.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="see-all-button"
                >
                    See All Posts
                </a>
            </div>
        </div>
    );
}

export default Blog;