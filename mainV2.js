
const container = document.getElementById("cards-container");
const titleContainer = document.getElementById("titulo-container") 

const currentDate = data.currentDate

const totalCards = [...data.events].map(event => event)

const cardsHome = totalCards.filter(() => titleContainer.text.includes("Home"))

const cardsUpcoming = totalCards.filter(() => titleContainer.text.includes("Upcoming")).filter((totalCards) => totalCards.date > currentDate)

const cardsPast = totalCards.filter(() => titleContainer.text.includes("Past")).filter((totalCards) => totalCards.date < currentDate)

let fusionedCards = [...cardsHome, ...cardsUpcoming, ...cardsPast]
fusionedCards.forEach(insertCard) 

const categories = totalCards.reduce((allCategories, events) => Array.from(new Set([...allCategories, events.category])), [])

categories.forEach(insertCheckbox)

const checkboxContainer = document.getElementById("checkbox-container")

function insertCheckbox(category) {
    checkboxContainer.innerHTML += `
    <div class="form-check">
    <label class="form-check-label text-white"><input type="checkbox" value="${category}" class="form-check-input checkClass" id="${category}">${category}</label>
    </div>
    `
}

//Traigo con DOM el input del Search y los boxes de los checkbox
const inputSearch = document.getElementById("inputSearch")
let checkClass = document.querySelectorAll(".checkClass")

checkClass = Array.from(checkClass)
//va a ejecutar una función (acción) cuando detecte el clic
checkClass.forEach(check => check.addEventListener("click", checkboxFunction))
//va a ejecutar una función cuando detecte el texto dentro del search input
inputSearch.addEventListener("input", checkboxFunction)

function checkboxFunction() {
    //Creo la variable filteredC. Nombro una función (que describo después) que tome como parámetro el array en el que agrupamos los array filtrados anteriormente.
    let filteredCheckboxes = checkEvents(fusionedCards)
    //Aqui cruzo los filtros. Creo una nueva variable con una función para search que va a ejecutarse teniendo en cuenta la ejecución de la función de checkboxes
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

