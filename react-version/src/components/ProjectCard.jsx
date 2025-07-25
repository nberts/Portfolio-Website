import React from "react";

const formatRepoName = (name) => {
    const words = name.split(/(?=[A-Z])|[-_]/);
    return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function ProjectCard({ project }) {
    const hasHomepage = project.homepage && project.homepage !== "";

    return (
            <div className="project-card-new">

            {/* Icon */}
            <div className="project-icon-container">
                {project.icon && <img src={project.icon} alt={`${project.name} icon`} />}
            </div>
        
            {/* Title */}
            <h3 className="project-title-new">{formatRepoName(project.name)}</h3>

            {/* Description */}
            <p className="project-description-new">
                {project.description || "A project I'm working on."} {/* Fallback text */}
            </p>

            <div className="project-links-new">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    View Code
                </a>
                {hasHomepage && (
                    <a href={project.homepage} className="launch-link" target="_blank" rel="noopener noreferrer">
                        Live Site
                    </a>
                )}
            </div>
        </div>
    );
}

export default ProjectCard;