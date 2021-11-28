package dk.gusfreddy.leaguefun.controllers;

import dk.gusfreddy.leaguefun.models.Match;
import dk.gusfreddy.leaguefun.models.Summoner;
import dk.gusfreddy.leaguefun.repositories.ChampionRepository;
import dk.gusfreddy.leaguefun.repositories.MatchRepository;
import dk.gusfreddy.leaguefun.repositories.SummonerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Summoners {

    @Autowired
    SummonerRepository summoners;

    @Autowired
    MatchRepository matches;

    @Autowired
    ChampionRepository champions;

    @GetMapping("/summoners")
    public Iterable<Summoner> getSummoners() {
        return summoners.findAll();
    }

    @GetMapping("/summoners/{id}")
    public Summoner getSummoner(@PathVariable Long id) {
        return summoners.findById(id).get();
    }

    @PostMapping("/summoners")
    public Summoner addSummoner(@RequestBody Summoner newSummoner) {
        // don't allow the client to overwrite the id
        newSummoner.setId(null);
        return summoners.save(newSummoner);
    }

    @PutMapping("/summoners/{id}")
    public String updateSummonerById(@PathVariable Long id, @RequestBody Summoner summonerToUpdateWith) {
        if (summoners.existsById(id)) {
            summonerToUpdateWith.setId(id);
            summoners.save(summonerToUpdateWith);
            return "Summoner was updated";
        } else {
            return "Summoner not found";
        }
    }

    @PatchMapping("/summoners/{id}")
    public String patchSummonerById(@PathVariable Long id, @RequestBody Summoner summonerToUpdateWith) {
        return summoners.findById(id).map(foundSummoner -> {
            if (summonerToUpdateWith.getName() != null) foundSummoner.setName(summonerToUpdateWith.getName());
            if (summonerToUpdateWith.getSummonerId() != null) foundSummoner.setSummonerId(summonerToUpdateWith.getSummonerId());
            if (summonerToUpdateWith.getAccountId() != null) foundSummoner.setAccountId(summonerToUpdateWith.getAccountId());
            if (summonerToUpdateWith.getPuuId() != null) foundSummoner.setPuuId(summonerToUpdateWith.getPuuId());
            if (summonerToUpdateWith.getProfileIconId() != 0) foundSummoner.setProfileIconId(summonerToUpdateWith.getProfileIconId());
            if (summonerToUpdateWith.getSummonerLevel() != 0) foundSummoner.setSummonerLevel(summonerToUpdateWith.getSummonerLevel());

            summoners.save(foundSummoner);
            return "Summoner updated";
        }).orElse("Summoner not found");
    }

    @DeleteMapping("/summoners/{id}")
    public void deleteSummonerById(@PathVariable Long id) {
        Iterable<Match> matchesToDelete = matches.findMatchesBySummonerId(id);
        matches.deleteAll(matchesToDelete);
        summoners.deleteById(id);
    }


}
