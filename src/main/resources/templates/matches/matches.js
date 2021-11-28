const matchesDiv = document.getElementById("all-saved-matches");

fetch(localurl + "/matches")
    .then(response => response.json())
    .then(matches => {
        matches.map(addMatchToDiv);
    })

function addMatchToDiv(match){

    const matchDivElement = document.createElement("div");
    matchDivElement.id=match.id;
    matchesDiv.appendChild(matchDivElement);
    constructMatch(matchDivElement, match);
}

function constructMatch(divElement, match) {
    divElement.innerHTML = `
     <div class="single-match-card">
    <div class="match-info-wrapper">
        <h1>${gameResult}</h1>
        <h4>
        Gametype ${match.info.gameMode}<br>
        Gametime ${Math.floor(match.info.gameDuration/60)}.${match.info.gameDuration-Math.floor(match.info.gameDuration/60)*60}
        </h4>
    </div>
    <div class="player-info-wrapper">
        <img src="${championImageUrlFirst}${chosenParticipant.championName}${championImageUrlSecond}">
        <p>${chosenParticipant.championName} lvl:${chosenParticipant.champLevel}</p>
        <p>K / D / A</p>
        <p>${chosenParticipant.kills} / ${chosenParticipant.deaths} / ${chosenParticipant.assists}</p>
        <p>Minions: ${chosenParticipant.totalMinionsKilled}</p>
    </div>
    `
}