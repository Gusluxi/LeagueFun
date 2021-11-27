const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const summonerId = URLParams.get("summonerId");
const matchesDiv = document.getElementById("summoners-matches-wrapper");
let chosenSummoner;
let localMatchesSaved = [];

fetch(localurl + "/summoners/" + summonerId)
    .then(response => response.json())
    .then(summoner => {
        fetchSummonersMatches(summoner);
        chosenSummoner = summoner;
    });


function fetchSummonersMatches(summoner){
    let promises = [];
   fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + summoner.puuId + "/ids?start=0&count=5&api_key=" + apikey)
        .then(response => response.json())
        .then(matchIds => {
            fetchLocalMatches(matchIds);
            matchIds.map(matchId => {
                console.log(matchId);
                promises.push(
                    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + apikey)
                        .then(response => response.json())
                )
            });
            Promise.all(promises).then(matches => {
                matches.map(addMatchToDiv)
        })
    })
}

function fetchLocalMatches(matchIds) {
    fetch(localurl + "/matches")
        .then(response => response.json())
        .then(localMatches => {
            localMatches.map(localMatch => {
                matchIds.map(matchId => {
                    if (matchId === localMatch.matchId) {
                        localMatchesSaved.push(localMatch);
                    }})
                }
            )
        });
}

function addMatchToDiv(match){
    const matchDiv = document.createElement("div");
    matchesDiv.appendChild(matchDiv);
    constructMatchDiv(matchDiv, match);
    console.log(match);
}


