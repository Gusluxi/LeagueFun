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
    let promises = [];
   fetch("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + summoner.puuId + "/ids?start=0&count=5&api_key=" + apikey)
        .then(response => response.json())
        .then(matchIds => {
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


function addMatchToDiv(match){
    const matchDiv = document.createElement("div");
    matchesDiv.appendChild(matchDiv);
    constructMatchDiv(matchDiv, match);
}

function constructMatchDiv(divElement, match){
     let chosenParticipant;
     let gameResult;
     let teamOneColor = "red";
     let teamTwoColor = "red";
    match.info.participants.map(paticipant => {
         if (paticipant.summonerId === chosenSummoner.summonerId) {
             chosenParticipant = paticipant;
         }
     })
    if (chosenParticipant.win === true) {
        gameResult = "Victory";
    } else {
        gameResult = "Loss";
    }
    if (match.info.participants[0].win === true) {
        teamOneColor = "green";
    } else {
        teamTwoColor = "green";
    }

    divElement.innerHTML=`<div class="single-match-card">
    <div class="match-info-wrapper">
        <h1>${gameResult}</h1>
        <h3>
        Gametype ${match.info.gameMode}<br>
        Gametime ${Math.floor(match.info.gameDuration/60)}.${match.info.gameDuration-Math.floor(match.info.gameDuration/60)*60}
        </h3>
    </div>
    <div class="player-info-wrapper">
        <img src="${championImageUrlFirst}${chosenParticipant.championName}${championImageUrlSecond}">
        <p>${chosenParticipant.championName} - Level: ${chosenParticipant.champLevel}</p>
        <p>K / D / A</p>
        <p>${chosenParticipant.kills} / ${chosenParticipant.deaths} / ${chosenParticipant.assists}</p>
        <p>Minions: ${chosenParticipant.totalMinionsKilled}</p>
    </div>
    <div class="participants-wrapper">
        <div class="team-one" style="color: ${teamOneColor}">
        <p>${match.info.participants[0].summonerName}<br>
        ${match.info.participants[1].summonerName}<br>
        ${match.info.participants[2].summonerName}<br>
        ${match.info.participants[3].summonerName}<br>
        ${match.info.participants[4].summonerName}</p>
        </div>
        <div class="team-one-kda">
        <p>${match.info.participants[0].kills} / ${match.info.participants[0].deaths} / ${match.info.participants[0].assists}<br>
        ${match.info.participants[1].kills} / ${match.info.participants[1].deaths} / ${match.info.participants[1].assists}<br>
        ${match.info.participants[2].kills} / ${match.info.participants[2].deaths} / ${match.info.participants[2].assists}<br>
        ${match.info.participants[3].kills} / ${match.info.participants[3].deaths} / ${match.info.participants[3].assists}<br>
        ${match.info.participants[4].kills} / ${match.info.participants[4].deaths} / ${match.info.participants[4].assists}</p>
        </div>
        <div class="team-splitter"></div>
        <div class="team-two" style="color: ${teamTwoColor}">
        <p>${match.info.participants[5].summonerName}<br>
       ${match.info.participants[6].summonerName}<br>
       ${match.info.participants[7].summonerName}<br>
       ${match.info.participants[8].summonerName}<br>
       ${match.info.participants[9].summonerName}</p>
        </div>
        <div class="team-two-kda">
        <p>${match.info.participants[5].kills} / ${match.info.participants[5].deaths} / ${match.info.participants[5].assists}<br>
        ${match.info.participants[6].kills} / ${match.info.participants[6].deaths} / ${match.info.participants[6].assists}<br>
        ${match.info.participants[7].kills} / ${match.info.participants[7].deaths} / ${match.info.participants[7].assists}<br>
        ${match.info.participants[8].kills} / ${match.info.participants[8].deaths} / ${match.info.participants[8].assists}<br>
        ${match.info.participants[9].kills} / ${match.info.participants[9].deaths} / ${match.info.participants[9].assists}</p>
        </div>
    </div>
    <button onclick="removeGalleryForm()">Save Match</button>
</div>`
}



