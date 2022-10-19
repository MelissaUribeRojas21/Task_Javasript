//Obtener el ID del contenedor de las cards y del título (home, upcoming, past)
const container = document.getElementById("cards-container");
const titleContainer = document.getElementById("titulo-container") 

//Obtener ID de contenedores de checkbox y search
const checkboxContainer = document.getElementById("checkbox-container")
const inputSearch = document.getElementById("inputSearch")

//Obtener el valor de date del array de Data (para upcoming y past)
const currentDate = data.currentDate

//Crear un nuevo array (totalCards) a través del map 
const totalCards = [...data.events].map(event => event)

const cardsHome = totalCards.filter(() => titleContainer.text.includes("Home"))

const cardsUpcoming = totalCards.filter(() => titleContainer.text.includes("Upcoming")).filter((totalCards) => totalCards.date > currentDate)

const cardsPast = totalCards.filter(() => titleContainer.text.includes("Past")).filter((totalCards) => totalCards.date < currentDate)

let fusionedCards = [...cardsHome, ...cardsUpcoming, ...cardsPast]
fusionedCards.forEach(insertCard)

//filtro de categorias checkbox y maping de search

const categories = totalCards.reduce((allCategories, events) => Array.from(new Set([...allCategories, events.category])), [])

categories.forEach(insertCheckbox)

function insertCheckbox(category) {
    checkboxContainer.innerHTML += `
    <div class="form-check">
    <label class="form-check-label text-white"><input type="checkbox" value="${category}" class="form-check-input checkClass" id="${category}">${category}</label>
    </div>
    `
}

// hacer los checkboxes

let checkClass = document.querySelectorAll(".checkClass")
checkClass = Array.from(checkClass)
checkClass.forEach(check => check.addEventListener("click", checkboxFunction))
inputSearch.addEventListener("input", checkboxFunction)

function checkboxFunction() {
    let filteredCheckboxes = checkEvents(fusionedCards)
    let filteredSearch = filteredCardsBySearch(filteredCheckboxes, inputSearch.value)
    if (filteredSearch.length !== 0) {
        container.innerHTML = ``
    }
    filteredSearch.forEach(insertCard)
}

function checkEvents(array) {
    let checkboxChecked = checkClass.filter(check => check.checked).map(checkedCategory => checkedCategory.value)
    if (checkboxChecked.length > 0) {
        let filteredCheckboxes = array.filter(event => checkboxChecked.includes(event.category))
        return filteredCheckboxes
    }
    return array
}

function filteredCardsBySearch(array, searchingText) {
    let filteredCardsForSearching = array.filter(event => event.name.toLowerCase().includes(searchingText.toLowerCase()))
    if (filteredCardsForSearching.length < 1) {
        emptySearch()
        return []
    }
    return filteredCardsForSearching
}

function emptySearch() {
    container.innerHTML = `
    <img src="./assets/images/404.png" alt="page not found">
    `
}

function insertCard(event) {
    container.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${event.image}" class="image of ${event.name}" alt="${event.name} photo">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div>
                    <h6>$${event.price}</h6>
                    <a href="../../pages/details.html?id=${event._id}" class="btn btn-sm">View more</a>
                </div>
            </div>
    </div>
    `
}

