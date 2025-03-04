
function search() {
    const searched = document.querySelector('#searchBar').value;

}

function filterSearched(searched) {
    
}

function showResults(results) {

}



document.querySelector('#searchButton').addEventListener('click', filterSearched);




const api = 'https://api.inaturalist.org/v1/';

async function search() {
    const place = document.querySelector('#placeInput').value;
    // const date = document.querySelector('#dateInput').value;

    let query = `${api}observations?place_id=${place}`;

    const response = await fetch(query);
    const data = await response.json();

    console.log(data.results);
    showResults(data.results);
}

function showResults(results) {
    const resultsEl = document.querySelector('#results');
    resultsEl.innerHTML = resultsTemplate(results);
}

function resultsTemplate(results) {
    return results.map(obs =>
        `<div class="card">
            <img src="${obs.taxon?.default_photo?.medium_url || 'https://via.placeholder.com/150'}" 
                    alt="${obs.taxon?.name || 'Unknown'}">
            <p>${obs.taxon?.name || 'Unknown'}</p>
        </div>`).join('');
}

document.querySelector('#searchButton').addEventListener('click', search);