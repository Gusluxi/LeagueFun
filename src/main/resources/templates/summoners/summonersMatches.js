const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const summonerId = URLParams.get("summonerId");
const matchesDiv = document.getElementById("summoners-matches-wrapper");
let chosenSummoner;

fetch(localurl + "/summoners/" + summonerId)
    .then(response => response.json())
    .then(summoner => {
        fetchSummonersMatches(summoner);
        chosenSummoner = summoner;
    });



function fetchSummonersMatches(summoner){
    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + summoner.puuId + "/ids?start=0&count=2&api_key=" + apikey)
        .then(response => response.json())
        .then(matchIds => {
            matchIds.map(showMatches)
        })
        };

function showMatches(matchId){
    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + apikey)
        .then(response => response.json())
        .then(match => {
            addMatchToDiv(match)
            console.log(match)
        })
};

 function addMatchToDiv(match){
    const matchDiv = document.createElement("div");
    matchesDiv.appendChild(matchDiv);
    constructMatchDiv(matchDiv, match);
}

function constructMatchDiv(divElement, match){
    divElement.innerHTML=`<div>
    <p>Gametype ${match.info.gameMode}</p>
    <p>Gametime ${match.info.gameDuration}</p>
    <p>Champion ${match.info.gameMode}</p>
    <p>Win/Loss ${match.info.gameMode}</p>
    <p>Level ${match.info.gameMode}</p>
    <p>Kills ${match.info.gameMode}</p>
    <p>Deaths ${match.info.gameMode}</p>
    <p>Assists ${match.info.gameMode}</p>
    <p>Minion Kills ${match.info.gameMode}</p>
    <p>Participants ${match.info.gameMode}</p>
    <button onclick="removeGalleryForm()">Cancel</button>
    <button onclick="createGallery()">Create A New Gallery</button>
</div>`
};



