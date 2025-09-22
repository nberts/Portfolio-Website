import React, {useEffect, useState, useRef} from "react";
import ProjectCard from "../components/ProjectCard";

function Portfolio() {
    const projectMetadata = {
        "AI-travel-planner": {
            icon: '/icons/travel.svg'
        },
        
        "Portfolio-Website": {
            icon: '/icons/PersonalWebsite.svg'
        },
        "lan-chat": {
            icon: '/icons/LANChat.svg'
        },      
        "Personal-Website": {
            icon: '/icons/PersonalWebsite.svg'
        },
        "FirstPhoneChallenge": {
            icon: '/icons/FirstPhone.svg'
        },        
        "Nature-of-Code": {
            icon: '/icons/Misc.svg'
        },        
        "Portfolio": {
            icon: '/icons/PersonalWebsite.svg'
        },        
        "nberts": {
            icon: '/icons/Misc.svg'
        },        
        "NewYearsResolutionChallenge": {
            icon: '/icons/NYresolution.svg'
        },        
        "Assignment5_CodedInteractives": {
            icon: '/icons/Assignments.svg'
        },     
        "WeatherApp-React": {
            icon: '/icons/WeatherApp.svg'
        },        
        "dotfiles": {
            icon: '/icons/Misc.svg'
        },        
        "AI-Poem-Generator": {
            icon: '/icons/PoemGenerator.svg'
        },        
        "SheCodes-AI-Add-On-Assignments": {
            icon: '/icons/Assignments.svg'
        },        
        "WorldClockProject": {
            icon: '/icons/WorldClock.svg'
        },
        "SheCodesPlusAddOnAssignments": {
            icon: '/icons/Assignments.svg'
        },        
        "SheCodesBasicsAddOnAssignments": {
            icon: '/icons/Assignments.svg'
        },        
        "MyFavouriteHobby": {
            icon: '/icons/FavouriteHobby.svg'
        },        
        "urbangarden_ninaB": {
            icon: '/icons/UrbanGarden.svg'
        },        
        "clothingbrand_NinaB": {
            icon: '/icons/ClothingBrand.svg'
        },                   
        "WeatherApplication": {
            icon: '/icons/WeatherApp.svg'
        },        
        "WeatherApplication2": {
            icon: '/icons/WeatherApp.svg'
        },        
        "FirstWeatherApplication": {
            icon: '/icons/WeatherApp.svg'
        }
    }

    const excludeRepos = ['🪴Personal'];
    
    const [projects, setProjects] = useState([]); //stores repo list
    const [isLoading, setIsLoading] = useState(true); // track loading
    const [error, setError] = useState(null); //to store errors
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/nberts/repos');

                if (!response.ok) {
                    throw new Error('Oops! Something went wrong with the GitHub API.');
                }

                const data = await response.json();

                const formattedProjects = data
                    .filter(repo => projectMetadata[repo.name])
                    .filter(repo => !excludeRepos.includes(repo.name))
                    .map(repo => ({
                        id: repo.id,
                        name: repo.name,
                        repoUrl: repo.html_url,
                        homepage: repo.homepage,
                        description: repo.description,
                        icon: projectMetadata[repo.name]?.icon || null
                }));

                setProjects(formattedProjects);
            }   catch (err) {
                setError(err.message);
            }   finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
        setTimeout(checkScrollButtons, 500);
    }, []);

    const carouselRef = useRef(null);

    const scroll = (direction) => {
        const carousel = carouselRef.current;
        if (carousel) {
            const card = carousel.querySelector('.project-card-new');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = parseInt(window.getComputedStyle(carousel).gap) || 30;
                const scrollAmount = cardWidth + gap;
                const scrollValue = direction === 'left' ? -scrollAmount : scrollAmount;
                carousel.scrollBy({ left: scrollValue, behavior: 'smooth'})
            }
        }
    };

    const checkScrollButtons = () => {
        const carousel = carouselRef.current;
        if(carousel) {
            setCanScrollLeft(carousel.scrollLeft > 0);
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            setCanScrollRight(carousel.scrollLeft < maxScrollLeft -1);
        }
    };

    if (isLoading) {
        return (
            <div className="portfolio-section">
                <h2>Portfolio</h2>
                <p>Loading projects...</p>
            </div>
        );
    } 

    if (error) {
        return (
            <div className="portfolio-section">
                <h2>Portfolio</h2>
                <p>Error: {error}</p>
            </div>
        );
    }
    
    return (
        <div className="portfolio-section">
            <h2>Portfolio</h2>
            <div className="carousel-container">
                <button className="carousel-button prev" onClick={() => scroll('left')} disabled={!canScrollLeft}>←</button>

                <div className="project-carousel" ref={carouselRef} onScroll={checkScrollButtons}>
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </div>

                <button className="carousel-button next" onClick={() => scroll('right')} disabled={!canScrollRight}>→</button>
            </div>
        </div>
    );
}

export default Portfolio;