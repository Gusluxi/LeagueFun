const championDiv = document.getElementById("champion-wrapper-wrapper");
const searchChampionInput = document.getElementById("champion-name-input");
let savedChampions;

fetch(localurl + "/champions")
    .then(response => response.json())
    .then(champions => {
        savedChampions = champions;
    })

document.getElementById("search-for-champion").addEventListener("click", searchForChampion);

function searchForChampion(){
    let promises = [];
    fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
        .then(response => response.json())
        .then(champions => {
            for (const value in champions.data){
                savedChampions.map(savedChampion => {
                    console.log(`${value}`)
                    if (savedChampion ===  `${value}`){
                       // promises.push(
                         //   fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/" + `${key}` + ".json")
                           //     .then(response => response.json()))
                    }
                })
            }
            Promise.all(promises)
                .then(championsAll => {
                    console.log(championsAll)
                    championsAll.map(champion => {
                        const championToSave = {
                            championId: champion.key
                        }
                        console.log(champion.key)
                        fetch(localurl + "/champions", {
                            method: "POST",
                            headers: {"Content-type": "application/json; charset=UTF-8"},
                            body: JSON.stringify(championToSave)
                        }).then(response => {
                            if (response.status === 200) {
                            } else {
                                console.log(response.status);
                            }
                        })
                    })
                })
            })
        };

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