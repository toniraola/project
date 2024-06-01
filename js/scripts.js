// Function to get the current page
function getCurrentPage() {
    const pathname = window.location.pathname;
    if (pathname.includes('page1.html')) {
        return 'page1';
    } else if (pathname.includes('page2.html')) {
        return 'page2';
    }
    return 'index';
}

// Function to populate the dropdown with movie names
function populateDropdown() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(movies => {
            const select = document.getElementById('movieSelect');
            select.innerHTML = ''; // Clear previous options

            const currentPage = getCurrentPage();
            let filteredMovies;

            if (currentPage === 'page1') {
                filteredMovies = movies.filter(movie => movie.year >= 1980 && movie.year <= 1989);
            } else if (currentPage === 'page2') {
                filteredMovies = movies.filter(movie => movie.year >= 1990 && movie.year <= 1999);
            } else {
                filteredMovies = movies; // Default to all movies if not on page1 or page2
            }

            filteredMovies.forEach(movie => {
                const option = document.createElement('option');
                option.value = movie.name;
                option.textContent = movie.name;
                select.appendChild(option);
            });

            // Trigger change event to initially display details for the first movie
            if (filteredMovies.length > 0) {
                select.dispatchEvent(new Event('change'));
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to display movie details when a movie is selected
function displayMovieDetails(movieName) {
    fetch('data/data.json')
        .then(response => response.json())
        .then(movies => {
            const selectedMovie = movies.find(movie => movie.name === movieName);

            const detailsDiv = document.getElementById('movieDetails');
            detailsDiv.innerHTML = `
                <p><p/>
                <p><strong>Name:</strong> ${selectedMovie.name}</p>
                <p><strong>Year of Release:</strong> ${selectedMovie.year}</p>
                <p><strong>Director:</strong> ${selectedMovie.director}</p>
                <p><strong>Main Actors:</strong> ${selectedMovie.actors.join(', ')}</p>
                <img src="${selectedMovie.image}" alt="${selectedMovie.name}">
            `;
        })
        .catch(error => console.error('Error:', error));
}

// Event listener for dropdown change
document.getElementById('movieSelect').addEventListener('change', function (event) {
    const selectedMovieName = event.target.value;
    displayMovieDetails(selectedMovieName);
});

// Populate the dropdown on page load
populateDropdown();
