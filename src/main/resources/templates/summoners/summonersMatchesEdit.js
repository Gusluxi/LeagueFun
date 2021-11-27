function constructMatchDiv(divElement, match){
    console.log(localMatchesSaved);
    console.log(match);
    let localMatchFound;
    let chosenParticipant;
    let gameResult;
    let teamOneColor = "red";
    let teamTwoColor = "red";

    const savedMatchDiv = document.createElement("div");


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
    localMatchesSaved.map(localMatch => {
        if (localMatch.matchId === match.metadata.matchId) {
            localMatchFound = localMatch;
            basicLocalMatchDiv(savedMatchDiv, localMatch)
        }
    })

    divElement.innerHTML=`
    <div class="single-match-card">
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
    <div class="local-match-saving">
         <div id="match-saving-${match.metadata.matchId}">
        </div> 
    </div>
    <div class="edit-button"><button id="edit-match-button-${match.metadata.matchId}"">Edit Match Notes</button></div>
</div>`
    document.getElementById("match-saving-"+match.metadata.matchId).appendChild(savedMatchDiv);
    document.getElementById(`edit-match-button-${match.metadata.matchId}`)
        .addEventListener("click", () => showMatchForm(match, chosenParticipant, localMatchFound))
}



function showMatchForm(match, chosenParticipant, localMatchFound) {
    console.log("Button CLicked")
    const savedMatchesDiv = document.getElementById("match-saving-"+match.metadata.matchId);
    if (!localMatchFound) {
        savedMatchesDiv.innerHTML = `
            <textarea id="add-comment-${match.metadata.matchId}" cols="40" rows="4" placeholder="Game Comment"></textarea><br><br>
            <input id="add-salt-level-${match.metadata.matchId}" type="range" min="0" max="100" value="50"/>
            <p>Tilt Level: <span id="slider-output-${match.metadata.matchId}"></span>% 
            <button id="update-saved-matches-${match.metadata.matchId}"">✅</button>
            <button id="cancel-update-${match.metadata.matchId}">✖</button>
            </p>
        `;
    } else {
        savedMatchesDiv.innerHTML = `
            <textarea id="add-comment-${match.metadata.matchId}" cols="40" rows="4" placeholder="Game Comment" value="${escapeHTML(localMatchFound.gameComment)}">${escapeHTML(localMatchFound.gameComment)}</textarea><br><br>
            <input id="add-salt-level-${match.metadata.matchId}" type="range" min="0" max="100" value="${escapeHTML(localMatchFound.teammateSaltLevel.toString())}"/>
            <p>Tilt Level: <span id="slider-output-${match.metadata.matchId}"></span>% 
            <button id="update-saved-matches-${match.metadata.matchId}"">✅</button>
            <button id="cancel-update-${match.metadata.matchId}">✖</button>
            </p>
        `;
    }
    let saltSlider = document.getElementById(`add-salt-level-${match.metadata.matchId}`)
    let sliderOutput = document.getElementById(`slider-output-${match.metadata.matchId}`)
    sliderOutput.innerHTML = saltSlider.value;

    saltSlider.oninput = function() {
        sliderOutput.innerHTML = this.value;
    }
    document.getElementById(`cancel-update-${match.metadata.matchId}`)
        .addEventListener("click", () => {
            if (!localMatchFound) {
                savedMatchesDiv.innerHTML = "";
            } else {
                basicLocalMatchDiv(savedMatchesDiv,localMatchFound)
            }
        })
    document.getElementById(`update-saved-matches-${match.metadata.matchId}`)
        .addEventListener("click",() => {
            saveToDatabase(match, chosenParticipant, localMatchFound, savedMatchesDiv)
        })
}

function saveToDatabase(match, chosenSummoner, localMatchFound, dataDiv) {

    if (localMatchFound) {
        const matchToUpdate = {
            id: localMatchFound.id,
            matchId: localMatchFound.matchId,
            matchWon: chosenSummoner.win,
            gameType: match.info.gameMode,
            teammateSaltLevel: document.getElementById("add-salt-level-"+localMatchFound.matchId).value,
            gameComment: document.getElementById("add-comment-"+localMatchFound.matchId).value
        }

        console.log(matchToUpdate);

        fetch(localurl+"/matches/"+localMatchFound.id, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(matchToUpdate)
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    basicLocalMatchDiv(dataDiv, matchToUpdate);
                } else {
                    console.log("Match not updated", response.status);
                }
            })
            .catch(error => console.log("Network related error: " + error));
    } else {
        const matchToAdd = {
            matchId: match.metadata.matchId,
            matchWon: chosenSummoner.win,
            gameType: match.info.gameMode,
            teammateSaltLevel: document.getElementById("add-salt-level-"+match.metadata.matchId).value,
            gameComment: document.getElementById("add-comment-"+match.metadata.matchId).value
        }
        console.log(matchToAdd);

        fetch(localurl+"/matches", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(matchToAdd)
        })
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    basicLocalMatchDiv(dataDiv, matchToAdd)
                } else {
                    console.log("Match not added", response.status);
                }
            })
            .catch(error => console.log("Network related error: " + error)); //
    }
}


function basicLocalMatchDiv(localMatchDiv, localMatch) {
    localMatchDiv.innerHTML = `
            <p>Comment: "${localMatch.gameComment}"<br>
            Teammates Salty Level: ${localMatch.teammateSaltLevel}%<br>
            </p>
            `;
}