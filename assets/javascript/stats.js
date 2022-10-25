const table1 = document.getElementById('table1')
const table2 = document.getElementById('table2')
const table3 = document.getElementById('table3')

async function apiEvents() {
    try {
        var dataFromApi = await fetch("https://mh-amazing.herokuapp.com/amazing")
        dataFromApi = await dataFromApi.json()
    } catch (error) {
        console.log(error);
    }

    //1. Definir el contenido que le corresponden a las cards de cada página: home, upcoming y past.
    let allEvents = dataFromApi.events
    let upcomingEvents = dataFromApi.events.filter(event => event.estimate)
    let pastEvents = dataFromApi.events.filter(event => event.assistance)
    

    //2. Nuevos arrays con nuevos objetos: crear porcentaje asistencia y ganancia de cada página (h,u y p), donde se incluyan como objetos dentro de cada array a través de map

    allEvents.map(event => {
        event.attendancePerc = (event.assistance * 100) / event.capacity
        event.revenue = event.price * event.assistance
    })

    upcomingEvents.map(event => {
        event.attendancePercentage = 100 * event.estimate / event.capacity
        event.revenue = parseInt(event.price) * parseInt(event.estimate)
    })

    pastEvents.map(event => {
        event.attendancePerc = (event.assistance * 100) / event.capacity
        event.revenue = parseInt(event.price) * parseInt(event.assistance)
    })

    //3. Celda 1 y 2: Events with the highest percentage of attendance y Event with the lowest of attendance
    let attendancePerc = [...pastEvents].sort((event1, event2) => event1.attendancePerc - event2.attendancePerc)
    let lowerAttendance = attendancePerc[0]
    let mayorAttendance = attendancePerc[attendancePerc.length - 1]


    //4. Celda 3: Event with larger capacity
    let eventsCapacity = [...allEvents].sort((event1, event2) => event1.capacity - event2.capacity)
    let mayorCapacity = eventsCapacity[eventsCapacity.length - 1]

    //5. Events categories (home, upcoming, past)
    let allCategories = [...new Set(allEvents.map(event => event.category))]
    let upcomingCategories = [...new Set(upcomingEvents.map(event => event.category))]
    
    allCategories.forEach(element => {
        let capacity = 0
        let assistance = 0
        let revenues = 0
        pastEvents.forEach(event => {
            if (event.category === element) {
                capacity += event.capacity
                assistance += event.assistance
                revenues += event.revenue
            }
        })
        table3.innerHTML += `<tr>
                                <td>${element}</td>
                                <td>${revenues.toLocaleString('de-DE')}</td>
                                <td>${Math.round(assistance * 100 / capacity)}%</td>
                            </tr>`
    });


    upcomingCategories.forEach(element => {
        let capacity = 0
        let estimate = 0
        let revenues = 0
        upcomingEvents.forEach(event => {
            if (event.category === element) {
                capacity += event.capacity
                estimate += event.estimate
                revenues += event.revenue
            }
        })
        table2.innerHTML += `<tr>
                                <td>${element}</td>
                                <td>${revenues.toLocaleString('de-DE')}</td>
                                <td>${Math.round(estimate * 100 / capacity)}%</td>
                            </tr>`
    });

    table1.innerHTML += `<tr>
                                <td>${maxPercAssi.name}: ${maxPercAssi.percentageAssistance}%</td>
                                <td>${minPercAssi.name}: ${minPercAssi.percentageAssistance}%</td>
                                <td>${maxCapEvent.name}: ${parseInt(maxCapEvent.capacity).toLocaleString('de-DE')}</td>
                            </tr>`
}
apiEvents()