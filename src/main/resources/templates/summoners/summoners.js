fetch("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summoner.name + "?api_key=" + apikey)
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });