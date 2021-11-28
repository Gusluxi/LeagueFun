package dk.gusfreddy.leaguefun.controllers;

import dk.gusfreddy.leaguefun.models.Champion;
import dk.gusfreddy.leaguefun.repositories.ChampionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Champions {

    @Autowired
    ChampionRepository champions;

    @GetMapping("/champions")
    public Iterable<Champion> getChampions() {
        return champions.findAll();
    }

    @GetMapping("/champions/{id}")
    public Champion getChampion(@PathVariable Long id) {
        return champions.findById(id).get();
    }


    @PostMapping("/champions")
    public Champion addChampion(@RequestBody Champion newChamp) {
        // don't allow the client to overwrite the id
        newChamp.setId(null);
        return champions.save(newChamp);
    }

    @PutMapping("/champions/{id}")
    public String updateChampWithId(@PathVariable Long id, @RequestBody Champion champToUpdateWith) {
        if (champions.existsById(id)) {
            champToUpdateWith.setId(id);
            champions.save(champToUpdateWith);
            return "Champion was updated";
        } else {
            return "Champion not found";
        }
    }

    @PatchMapping("/champions/{id}")
    public String patchChampById(@PathVariable Long id, @RequestBody Champion champToUpdateWith) {
        return champions.findById(id).map(foundChampion -> {
            if (champToUpdateWith.getChampionId() != 0) foundChampion.setChampionId(champToUpdateWith.getChampionId());
            champions.save(foundChampion);
            return "Champion updated";
        }).orElse("Champion not found");
    }

    @DeleteMapping("/champions/{id}")
    public void deleteChampionById(@PathVariable Long id) {
        champions.deleteById(id);
    }

}
