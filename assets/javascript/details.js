const detailContainer = document.getElementById("detailCard")

async function infoDetails(){
    try{
        var detailsJson = await fetch('https://amazing-events.herokuapp.com/api/events')
        detailsJson = await detailsJson.json()
    }catch(notFound){
        console.log(notFound)
    }
    let totalEvents = detailsJson.events
    let idLocation = location.search.slice(7)
    let filteredEvent = totalEvents.find((event) => idLocation == event._id)

    cardDetail(filteredEvent)
}

infoDetails()

//_____________________________________________________

/* 
//Obtener el contenedor de la card desde el HTML:
const detailContainer = document.getElementById("detailCard")

// Obtener los eventos del Data
let totalEvents = data.events

//Obtener el ID del location

let idLocation = location.search.slice(4)

//Filtrar array (events) para que solo devuelva 1 evento que coincida con el ID obtenido por el location
let filteredEvent = totalEvents.filter(event => idLocation == event._id)
filteredEvent = filteredEvent[0]

//Imprimir el evento
cardDetail(filteredEvent) */

//Crear una función para obtener la info de la card
function cardDetail(event) {
    if (event.assistance !== undefined) {
        detailContainer.innerHTML = `
    <article class="info-container-2">
        <div>
            <div class="img-info-container">
                <img src="${event.image}" alt="food festival">
            </div>
        </div>
        <div class="info-container-3">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <h5>Date</h5>
            <p>${event.date}</p>
            <h5>Category</h5>
            <p>${event.category}</p>
            <h5>Place</h5>
            <p>${event.place}</p>
            <h5>Capacity</h5>
            <p>${event.capacity}</p>
            <h5>Assistance</h5>
            <p>${event.assistance}</p>
            <h5>Price</h5>
            <p>$${event.price}</p>
        </div>
    </article>
    `
    } else {
        detailContainer.innerHTML = `
    <article class="info-container-2">
        <div>
            <div class="img-info-container">
                <img src="${event.image}" alt="food festival">
            </div>
        </div>
        <div class="info-container-3">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <h5>Date</h5>
            <p>${event.date}</p>
            <h5>Category</h5>
            <p>${event.category}</p>
            <h5>Place</h5>
            <p>${event.place}</p>
            <h5>Capacity</h5>
            <p>${event.capacity}</p>
            <h5>Assistance</h5>
            <p>${event.assistance}</p>
            <h5>Estimated</h5>
            <p>${event.estimated}</p>
            <h5>Price</h5>
            <p>$${event.price}</p>
        </div>
    </article>
    `
    }
}

