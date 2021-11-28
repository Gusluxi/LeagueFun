const championDiv = document.getElementById("champion-wrapper");
const searchChampionInput = document.getElementById("champion-name-input");
let savedChampions;

fetchChamps();
function fetchChamps() {
fetch(localurl + "/champions")
    .then(response => response.json())
    .then(champions => {
        savedChampions = champions;
        championDiv.innerHTML= "";
        champions.map(addChampionToDiv);
    })
}


document.getElementById("search-for-champion").addEventListener("click", searchForChampion);

function searchForChampion(){
    let promises = [];
    fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
        .then(response => response.json())
        .then(champions => {
            console.log(champions)
            for (const key in champions.data) {
                    let championNameKey = `${key}`
                    //console.log(championNameKey);
                    promises.push(
                        fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/" + championNameKey + ".json")
                            .then(response => response.json()));
            }
            Promise.all(promises)
                .then(championsAll => {
                    console.log(championsAll);
                    championsAll.map(champion => {
                        const champData = Object.values(champion.data)
                        const championToSave = {
                            championId: champData[0].key,
                            name: champData[0].name,
                            championTitle: champData[0].title,
                            championImageName: champData[0].id,
                            championParType: champData[0].partype
                        }
                        let factor = true;
                        savedChampions.map(champ => {
                            if (champ.name === championToSave.name) {
                                factor = false;
                            }
                        })
                        if (factor) {
                            fetch(localurl + "/champions", {
                                method: "POST",
                                headers: {"Content-type": "application/json; charset=UTF-8"},
                                body: JSON.stringify(championToSave)
                            }).then(response => {
                                if (response.status === 200) {
                                    fetchChamps()
                                } else {
                                    console.log(response.status);
                                }
                            })
                        }
                    })
                })
        })
}


function addChampionToDiv(champion){
    const selectChampionToDiv = document.createElement("div");
    selectChampionToDiv.id=champion.id;
    selectChampionToDiv.innerHTML =`
<div class="champion-card">
    <div class="champion-header">
     <img src="${championImageUrlFirst}${champion.championImageName}${championImageUrlSecond}">
    <h1>${champion.name}</h1>
    <h2>Title: ${champion.championTitle}</h2>
    <h3>Resource: ${champion.championParType}</h3>
   </div>`

    championDiv.appendChild(selectChampionToDiv);
}

function searchHandler(event) {
    championDiv.innerHTML = "";
    const searchTerm = event.target.value.toLowerCase();
    savedChampions.filter(champ => champ.name.toLowerCase().includes(searchTerm))
        .map(addChampionToDiv);
}

searchChampionInput.addEventListener("input",searchHandler)