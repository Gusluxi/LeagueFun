const summonerDiv = document.getElementById("summoner-wrapper");
const searchSummonerInput = document.getElementById("summoner-name");

fetch(localurl + "/summoners")
    .then(response => response.json())
    .then(summoners => {
        summoners.map(addSummonerToDiv);
    })

function addSummonerToDiv(summoner){
    const selectSummonerToDiv = document.createElement("div");
    selectSummonerToDiv.id=summoner.id;
    summonerDiv.appendChild(selectSummonerToDiv);
    constructSummoner(selectSummonerToDiv, summoner);
}

function constructSummoner(divElement, summoner){
    divElement.innerHTML = `
    <div class="summoner-card">
    <b>Summoner: </b>
    
    <div class="summoner-name"><a href="./summonersMatches.html?summonerId=${summoner.id}">${escapeHTML(summoner.name)}</a></div>
    
    <button onclick="deleteSummoner(${summoner.id})">❌</button>
    </div>`;
}

document.getElementById("search-for-summoner").addEventListener("click", searchForSummoner);

function searchForSummoner(){
    fetch("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchSummonerInput.value + "?api_key=" + apikey)
        .then(response => response.json())
        .then(summoner => {
           saveSummoner(summoner)
        })
};

function saveSummoner(summoner){
    const summonerToSave = {
        summonerId: summoner.id,
        accountId: summoner.accountId,
        puuId: summoner.puuid,
        name: summoner.name,
        profileIconId: summoner.profileIconId,
        summonerLevel: summoner.summonerLevel
    };

    fetch(localurl + "/summoners", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(summonerToSave)
    }).then(response => response.json())
        .then(summoner => {
            addSummonerToDiv(summoner);
    })
        .catch(error => console.log("network error" + error));
}

function deleteSummoner(summonerId) {
    fetch(localurl + "/summoners/" + summonerId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(summonerId).remove();
        } else {
            console.log(response.status);
        }
    });
}