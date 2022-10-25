const container = document.getElementById("cards-container")
const titleContainer = document.getElementById("titulo-container")
const checkboxContainer = document.getElementById("checkbox-container")
const inputSearch = document.getElementById("inputSearch")

async function infoCards() {
    try {
        var eventsFromJson = await fetch(`https://mh-amazing.herokuapp.com/amazing`)
        eventsFromJson = await eventsFromJson.json()
    } catch (error) {
        console.log(error)
    }

    const currentDate = eventsFromJson.date

    const totalCards = eventsFromJson.events.map(event => event)

    const cardsHome = totalCards.filter(() => titleContainer.text.includes("Home"))

    const cardsUpcoming = totalCards.filter(() => titleContainer.text.includes("Upcoming")).filter((totalCards) => totalCards.date > currentDate)

    const cardsPast = totalCards.filter(() => titleContainer.text.includes("Past")).filter((totalCards) => totalCards.date < currentDate)

    let fusionedCards = [...cardsHome, ...cardsUpcoming, ...cardsPast]
    fusionedCards.forEach(insertCard)

    const categories = totalCards.reduce((allCategories, event) => Array.from(new Set([...allCategories, event.category])), [])
    categories.forEach(insertCheckbox)

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

}

infoCards()

function insertCheckbox(categories) {
    checkboxContainer.innerHTML += `
    <div class="form-check">
    <label class="form-check-label text-white"><input type="checkbox" value="${categories}" class="form-check-input checkClass" id="${categories}">${categories}</label>
    </div>
    `
}

function filteredCardsBySearch(array, searchingText) {
    let filteredCardsForSearching = array.filter(event => event.name.toLowerCase().includes(searchingText.toLowerCase()))
    if (filteredCardsForSearching.length < 1) {
        emptySearch()
        return []
    }
    return filteredCardsForSearching
}

let url

if (titleContainer.text.includes("Home")) {
    url = {
        imgError: `./assets/images/404.png`,
        detail: `./pages/details.html`
    }
}else{
    url = {
        imgError: `../assets/images/404.png`,
        detail: `./details.html`
    }
}

function emptySearch() {
    container.innerHTML = `
    <img src="${url.imgError}" alt="page not found">
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
                    <a href="${url.detail}?event=${event.id}" class="btn btn-sm">View more</a>
                </div>
            </div>
    </div>
    `
}

