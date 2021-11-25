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
    fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + summoner.puuId + "/ids?start=0&count=5&api_key=" + apikey)
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
     let chosenParticipant;
     match.info.participants.map(paticipant => {
         if (paticipant.summonerId === chosenSummoner.summonerId) {
             chosenParticipant = paticipant;
         }
     })

    divElement.innerHTML=`<div>
    <p>Gametype ${match.info.gameMode}</p>
    <p>Gametime ${match.info.gameDuration}</p>
    <img src="${championImageUrlFirst}${chosenParticipant.championName}${championImageUrlSecond}">
    <p>Champion ${chosenParticipant.championName}</p>
    <p>Win/Loss ${chosenParticipant.win}</p>
    <p>Level ${chosenParticipant.champLevel}</p>
    <p>Kills ${chosenParticipant.kills}</p>
    <p>Deaths ${chosenParticipant.deaths}</p>
    <p>Assists ${chosenParticipant.assists}</p>
    <p>Minion Kills ${chosenParticipant.totalMinionsKilled}</p>
    <p>Participants: ${match.info.participants[0].summonerName},
    ${match.info.participants[1].summonerName},
    ${match.info.participants[2].summonerName},
    ${match.info.participants[3].summonerName},
    ${match.info.participants[4].summonerName},
    ${match.info.participants[5].summonerName},
    ${match.info.participants[6].summonerName},
    ${match.info.participants[7].summonerName},
    ${match.info.participants[8].summonerName},
    ${match.info.participants[9].summonerName}.
    </p>
    <button onclick="removeGalleryForm()">Cancel</button>
    <button onclick="createGallery()">Create A New Gallery</button>
</div>`
}



