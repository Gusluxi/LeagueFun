const championDiv = document.getElementById("champion-wrapper");
const searchChampionInput = document.getElementById("champion-name-input");
let savedChampions;


fetch(localurl + "/champions")
    .then(response => response.json())
    .then(champions => {
        savedChampions = champions;
        champions.map(addChampionToDiv);
    })

document.getElementById("search-for-champion").addEventListener("click", searchForChampion);

function searchForChampion(){
    let promises = [];
    fetch("http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json")
        .then(response => response.json())
        .then(champions => {
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
                            name: champData[0].id,
                            championTitle: champData[0].title,
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
     <img src="${championImageUrlFirst}${champion.name}${championImageUrlSecond}">
    <h1>${champion.name}</h1>
    <h2>Title: ${champion.championTitle}</h2>
    <h3>Resource: ${champion.championParType}</h3>
    <h4>${champion.championComment}</h4>
    
    <div class="edit-button"><button id="edit-champion-button-${champion.id}"">Edit Champion Comment</button></div>
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