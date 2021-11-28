const championDiv = document.getElementById("champion-wrapper-wrapper");
const searchChampionInput = document.getElementById("champion-name-input");

document.getElementById("search-for-champion").addEventListener("click", searchForChampion);

function searchForChampion(){
    fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
        .then(response => response.json())
        .then(champion => {
            if (champion.data === searchChampionInput)
                console.log(searchChampionInput)
            })
        };

/*
fetch(localurl + "/champions")
    .then(response => response.json())
    .then(champions => {
        champions.map(addChampionsToDiv);
    })

function addChampionToDiv(champion){
    const selectChampionToDiv = document.createElement("div");
    selectChampionToDiv.id=champion.id;
    championDiv.appendChild(selectChampionToDiv);
}

document.getElementById("search-for-summoner").addEventListener("click", searchForChampion);

function searchForChampion() {
    fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
        .then(response => response.json())
        .then(champions => {
            console.log(champions)
        })
};

function saveChampion(champion){
    const championToSave = {
        championId: champion.id,
        championLvl: champion.championLvl,
        championName: champion.championName,
        championIconId: champion.championIconId
    };

    fetch(localurl + "/champions", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(championToSave)
    }).then(response => response.json())
        .then(champion => {
            addChampionToDiv(champion);
        })
        .catch(error => console.log("network error" + error));
}
*/