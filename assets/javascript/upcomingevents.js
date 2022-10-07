const container = document.getElementById("cards-container");

for (let event of data.events) {
    if (data.currentDate < event.date) {
        insertCard(event);
    }
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
                    <a href="#" class="btn btn-sm">View more</a>
                </div>
            </div>
    </div>
    `
}