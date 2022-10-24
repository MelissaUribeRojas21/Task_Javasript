async function totalEvents(){
    try{
        var dataFromApi = await fetch ("https://mind-hub.up.railway.app/amazing")
        dataFromApi = await dataFromApi.json()
    }catch(error){
        console.log(error);
    }
}

