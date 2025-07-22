import React from "react";

const decodeHTML = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    return tempDiv.textContent || tempDiv.innerText || "";
}

function BlogPost({ title, excerpt, link}) {
    const cleanTitle = decodeHTML(title);
    const cleanExcerpt = decodeHTML(excerpt).slice(0, 80) + '...';

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="blog-post-card">
            <div className="post-content">
                <h3>{cleanTitle}</h3>
                <p>{cleanExcerpt}</p>  
            </div>
            <span className="read-more">→</span>
        </a>
    );
}

export default BlogPost;