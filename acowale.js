const apiKey = '83e08fe573ded5e4e436426dca820a50';
const apiUrl = 'https://gnews.io/api/v4/search';

document.addEventListener('DOMContentLoaded', () => {
    fetchNews(); // Initial fetch for latest news

    // Event listeners for search forms
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        searchNews();
    });
    
    document.getElementById('sports-search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('sports-search-bar').value;
        if (query.trim()) {
            searchSportsNews(query);
        }
    });
    
    document.getElementById('education-search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('education-search-bar').value;
        if (query.trim()) {
            searchEducationNews(query);
        }
    });
    
    document.getElementById('technology-search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const query = document.getElementById('technology-search-bar').value;
        if (query.trim()) {
            searchTechnologyNews(query);
        }
    });
    
    // Close all result boxes when clicking anywhere on the page
    document.addEventListener('click', (event) => {
        const allBoxes = document.querySelectorAll('.small-box');
        if (!event.target.closest('.small-box') && !event.target.closest('.search-box')) {
            allBoxes.forEach(box => {
                box.style.display = 'none';
            });
        }
    });

    generateBubbles(); // Generate bubbles for the background
});

// Function to generate bubbles for the background
function generateBubbles() {
    const container = document.querySelector('.background-container');
    if (!container) return; // Check if the container exists
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.width = `${Math.random() * 100 + 20}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `${Math.random() * 100}vh`;
        bubble.style.animationDuration = `${Math.random() * 10 + 5}s`;
        container.appendChild(bubble);
    }
}

// Function to fetch news from the API
function fetchNews(query = '', container = '#news-container') {
    const url = `${apiUrl}?q=${query}&lang=en&token=${apiKey}`;
    console.log('Fetching from URL:', url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched Data:', data);
            const newsContainer = document.querySelector(container);
            if (newsContainer) {
                newsContainer.innerHTML = '';
                if (data.articles.length === 0) {
                    newsContainer.innerHTML = '<p>No news articles found.</p>';
                } else {
                    data.articles.forEach(article => {
                        const newsCard = document.createElement('div');
                        newsCard.classList.add('small-box');
                        newsCard.innerHTML = `
                            <button class="close-btn">&times;</button>
                            <a href="${article.url}" target="_blank">
                                <h3>${article.title}</h3>
                            </a>
                        `;
                        newsContainer.appendChild(newsCard);
                    });

                    // Add event listener to close buttons
                    document.querySelectorAll('.close-btn').forEach(button => {
                        button.addEventListener('click', (e) => {
                            e.stopPropagation();
                            button.parentElement.style.display = 'none';
                        });
                    });
                }
            } else {
                console.error('News container not found.');
            }
        })
        .catch(error => console.error(`Error fetching news:`, error));
}

// Functions for searching news
function searchNews() {
    const query = document.getElementById('search-bar').value;
    fetchNews(query); // Default to Latest News container
}

function searchSportsNews() {
    const query = document.getElementById('sports-search-bar').value || 'sports';
    fetchNews(query, '.sports-news-container');
}

function searchEducationNews() {
    const query = document.getElementById('education-search-bar').value || 'education';
    fetchNews(query, '.education-news-container');
}

function searchTechnologyNews() {
    const query = document.getElementById('technology-search-bar').value || 'technology';
    fetchNews(query, '.technology-news-container');
}

// Function to toggle the hamburger menu
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    if (menuLinks) {
        menuLinks.classList.toggle('open');
    } else {
        console.error('Menu links not found.');
    }
}
