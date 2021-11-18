fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=100&api_key=" +apikey)
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });