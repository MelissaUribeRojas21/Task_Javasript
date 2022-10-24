const container = document.getElementById("cards-container")
const titleContainer = document.getElementById("titulo-container") 
const checkboxContainer = document.getElementById("checkbox-container")
const inputSearch = document.getElementById("inputSearch")

async function infoCards(){
    try{
        var eventsFromJson = await fetch(`https://mind-hub.up.railway.app/amazing`)
        eventsFromJson = await eventsFromJson.json()
    }catch(error){
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


//____________________________________________________________


/* //1. CREACION DE CARTAS EN HOME, UPCOMING Y PAST

//Obtener el ID del contenedor de las cards para luego crearlas dentro del contenedor 
const container = document.getElementById("cards-container")
//Obtener el título de cada página para que las cards se filtren según correspondan
const titleContainer = document.getElementById("titulo-container") 

//Obtengo el valor de date del array de Data (para upcoming y past)
const currentDate = data.currentDate

//Creo un proceso que permita recorrer cada uno de los objetos del array porque requiero obtener la info de cada uno. Así que creo un nuevo array donde obtengo todos los eventos a través de map (y no un forEach porque map genera un return como valor de resultado)
const totalCards = data.events.map(event => event)

//Filtra según el title del HTML. El filter está vacío porque no necesita parámetro en este caso para que la condición sea verdadera.
const cardsHome = totalCards.filter(() => titleContainer.text.includes("Home"))

//Recorre todo el array, objeto por objeto, y si se cumple la condición, filtra.
const cardsUpcoming = totalCards.filter(() => titleContainer.text.includes("Upcoming")).filter((totalCards) => totalCards.date > currentDate)

const cardsPast = totalCards.filter(() => titleContainer.text.includes("Past")).filter((totalCards) => totalCards.date < currentDate)

//Unifico en un solo array los array anteriores (14,17,19) que cumplieron la condición. Se aplica forEach para que solo los recorra y en cada recorrido me inserte la función que defino en el () -> insertCard
let fusionedCards = [...cardsHome, ...cardsUpcoming, ...cardsPast]
fusionedCards.forEach(insertCard)
//__________________________________________________________________________________________

//2. CHECKBOXES Y SEARCH

//Obtengo el ID de los contenedores de los checkbox y del search
const checkboxContainer = document.getElementById("checkbox-container")
const inputSearch = document.getElementById("inputSearch")

//Nombro los checkboxes (sin cajoncito): aplico un reduce al totalCards (que es el array que creé con map anteriormente) para obtener el valor del key (category) que deseo por cada iteración (event), para reunirlas en un nuevo array (allCategories). Otra opción también pudo haber sido map.
const categories = totalCards.reduce((allCategories, event) => Array.from(new Set([...allCategories, event.category])), [])

//pongo el cajoncito de check: aplico un forEach para que en cada vuelta se aplique la función inserCheckbox la cual agrega el input checkbox a las categorías anteriores
categories.forEach(insertCheckbox) */

//Defino una función a través de la cual insertaré los cajoncitos de check por medio de innerHTML
function insertCheckbox(categories) {
    checkboxContainer.innerHTML += `
    <div class="form-check">
    <label class="form-check-label text-white"><input type="checkbox" value="${categories}" class="form-check-input checkClass" id="${categories}">${categories}</label>
    </div>
    `
}

/* // 3. CHECK DE CADA CAJONCITO
//Llamo el ID donde se encuentra el input del checkbox (está dentro de la función que definí en la 41)
let checkClass = document.querySelectorAll(".checkClass")

//El query obtiene un nodo, entonces hay que convertirlo en array para luego aplicar métodos de array
checkClass = Array.from(checkClass)

//Genero un event "click" para que en cada click realice la función de la 60. Input es un event que "detecta el texto" y ejecuta la función de la 62
checkClass.forEach(check => check.addEventListener("click", checkboxFunction))
inputSearch.addEventListener("input", checkboxFunction)

//Funciones cruzadas. Según checkboxes checked, permite realizar búsqueda
function checkboxFunction() {
    let filteredCheckboxes = checkEvents(fusionedCards)
    let filteredSearch = filteredCardsBySearch(filteredCheckboxes, inputSearch.value)
    if (filteredSearch.length !== 0) {
        container.innerHTML = ``
    }
    filteredSearch.forEach(insertCard)
}

//Filtra los checkboxes que están seleccionados (chulito). Si está checkeado = true = filtra. Se mapea para devolver el valor y guardarlo en checkboxChecked. 
function checkEvents(array) {
    let checkboxChecked = checkClass.filter(check => check.checked).map(checkedCategory => checkedCategory.value)
    if (checkboxChecked.length > 0) {
        let filteredCheckboxes = array.filter(event => checkboxChecked.includes(event.category))
        return filteredCheckboxes
    }
    return array
} */

//búsqueda --> Search. True=card. False=función emptySearch
function filteredCardsBySearch(array, searchingText) {
    let filteredCardsForSearching = array.filter(event => event.name.toLowerCase().includes(searchingText.toLowerCase()))
    if (filteredCardsForSearching.length < 1) {
        emptySearch()
        return []
    }
    return filteredCardsForSearching
}

//Genero una función para que, cuando no coincida ninguna búsqueda, se genere alguna acción.
function emptySearch() {
    container.innerHTML = `
    <img src="./assets/images/404.png" alt="page not found">
    `
}

//Función para crear el contenido de cada carta para home, upcoming y past
function insertCard(event) {
    container.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${event.image}" class="image of ${event.name}" alt="${event.name} photo">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div>
                    <h6>$${event.price}</h6>
                    <a href="../../pages/details.html?event=${event.id}" class="btn btn-sm">View more</a>
                </div>
            </div>
    </div>
    `
}

