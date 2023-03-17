const peopleContainer = document.getElementById('people-container');
const paginationContainer = document.getElementById('pagination');
const loadingSpiner = document.getElementById('loading-spiner')

let currentPage = 1;
let totalPeople;
const peoplePage = 10;

function showLoadingSpinner () {
    loadingSpiner.classList.add('loading-spinner-visible');
}
function hideLoadingSpinner () {
    loadingSpiner.classList.remove('loading-spinner-visible');
}

function randerPeolpe(people){
    peopleContainer.innerHTML = '';
    
    people.forEach(person => {
        const personElement = document.createElement('div');
        personElement.classList.add('person');
        personElement.innerHTML = `
        <h2>${person.name}</h2>
        <p><strong>Height:</strong>${person.height}</p>
        <p><strong>Mass:</strong>${person.mass}</p>
        <p><strong>Hair_color:</strong>${person.hair_color}</p>
        <p><strong>Skin_color:</strong>${person.skin_color}</p>
        `;
        peopleContainer.appendChild(personElement)
    });
}
function randerPagination() {
    const totalPages = Math.ceil(totalPeople / peoplePage);
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerHTML = i;
console.log(button)
        if(i === currentPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', ()=> {
            currentPage = i;
            fetchPeople ();
        })
        paginationContainer.appendChild(button);
    }
}

function fetchPeople () {
    showLoadingSpinner();
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
.then((response)=>{
    return response.json();
})
.then((data)=>{
    totalPeople = data.count;
    randerPeolpe(data.results); 
    randerPagination();
    hideLoadingSpinner();
})
.catch((err)=>{
    console.log(err);
})

}
fetchPeople();



