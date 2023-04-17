const apiKey = 'c07f52bab6714a5fba95c5ac9d9616bb';

// Function to fetch articles from a news source and display them on the page
function fetchArticles(source, category) {
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&category=${category}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles;
            const sectionId = category.toLowerCase();
            const sectionContent = document.querySelector(`#${sectionId} - content`);
            sectionContent.innerHTML = ''; articles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.classList.add('article');

                const title = document.createElement('h3');
                title.textContent = article.title;

                const author = document.createElement('p');
                author.textContent = `By ${article.author}`;

                const description = document.createElement('p');
                description.textContent = article.description;

                const publishedAt = document.createElement('p');
                const publishedDate = new Date(article.publishedAt);
                publishedAt.textContent = `Published on ${publishedDate.toLocaleDateString()} at ${publishedDate.toLocaleTimeString()}`;

                const url = document.createElement('a');
                url.textContent = 'Read more';
                url.href = article.url;
                url.target = '_blank';

                articleDiv.appendChild(title);
                articleDiv.appendChild(author);
                articleDiv.appendChild(description);
                articleDiv.appendChild(publishedAt);
                articleDiv.appendChild(url);
                sectionContent.appendChild(articleDiv);
            });
        })
        .catch(error => console.log(error));
}

// Event listener to fetch articles when a news source link is clicked
const sourceLinks = document.querySelectorAll('[data-source]');
sourceLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const source = link.dataset.source;
        fetchArticles(source, 'general');
        fetchArticles(source, 'business');
        fetchArticles(source, 'technology');
    });
});

// Fetch articles from the default news source when the page is loaded
fetchArticles('bbc-news', 'general');
fetchArticles('bbc-news', 'business');
fetchArticles('bbc-news', 'technology');
