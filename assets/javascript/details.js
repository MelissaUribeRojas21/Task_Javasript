const detailContainer = document.getElementById("detailCard")

async function infoDetails(){
    try{
        var detailsJson = await fetch('https://mind-hub.up.railway.app/amazing')
        detailsJson = await detailsJson.json()
    }catch(notFound){
        console.log(notFound)
    }
    let totalEvents = detailsJson.events
    let idLocation = location.search.slice(7)
    let filteredEvent = totalEvents.find((event) => idLocation == event.id)

    cardDetail(filteredEvent)
}

infoDetails()

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
        date = new Date(event.date).toDateString();
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
            <h5>Estimate</h5>
            <p>${event.estimate}</p>
            <h5>Price</h5>
            <p>$${event.price}</p>
        </div>
    </article>
    `
    }
}



