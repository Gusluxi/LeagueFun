const matchesDiv = document.getElementById("all-saved-matches");
let savedMatches;

fetch(localurl + "/matches")
    .then(response => response.json())
    .then(matches => {
        savedMatches = matches;
        matches.map(constructMatch);
    })


function constructMatch(match) {
    const matchDivElement = document.createElement("div");
    matchDivElement.id=match.id;

    let gameResult;
    if (match.matchWon) {
        gameResult = "Victory";
    } else {
        gameResult = "Loss";
    }

    matchDivElement.innerHTML = `
     <div class="saved-match-card">
    <div class="saved-match-info-wrapper">
        <h1>${gameResult}</h1>
        <h4>
        Gametype ${match.gameType}<br>
        Summoner ${match.summoner.name}<br>
        </h4>
    </div>
    <div class="saved-player-info-wrapper">
        <img src="${championImageUrlFirst}${match.championName}${championImageUrlSecond}">
        <p>${match.championName} lvl:${match.championLevel}</p>
        <p>K / D / A</p>
        <p>${match.kills} / ${match.deaths} / ${match.assists}</p>
        <p>Minions: ${match.minionKills}</p>
    </div>
    <div class="saved-match-custom-wrapper">
        <p>
        Comment: ${match.gameComment}<br>
        Teammates Salt Level: ${match.teammateSaltLevel}%
        </p>
        
    </div>
    `;
    matchesDiv.appendChild(matchDivElement);
}

function searchHandler(event) {
    matchesDiv.innerHTML = "";
    const searchTerm = event.target.value.toLowerCase();
    savedMatches.filter(match => match.summoner.name.toLowerCase().includes(searchTerm))
        .map(constructMatch);
}

document.getElementById("filter-input").addEventListener("input",searchHandler)