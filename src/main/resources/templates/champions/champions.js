fetch("https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + encrypted.summmonerid + "?api_key=" + apikey)
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });