package dk.gusfreddy.leaguefun.controllers;

import dk.gusfreddy.leaguefun.DTO.response.MatchCreateDTO;
import dk.gusfreddy.leaguefun.models.Match;
import dk.gusfreddy.leaguefun.repositories.MatchRepository;
import dk.gusfreddy.leaguefun.repositories.SummonerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Matches {

    @Autowired
    MatchRepository matches;

    @Autowired
    SummonerRepository summoners;

    @GetMapping("/matches")
    public Iterable<Match> getMatches() {
        return matches.findAll();
    }

    @GetMapping("/matches/{id}")
    public Match getMatch(@PathVariable Long id) {
        return matches.findById(id).get();
    }

    @PostMapping("/matches/{summonerId}")
    public MatchCreateDTO createMatch(@PathVariable Long summonerId, @RequestBody Match newMatch) {

        return summoners.findById(summonerId).map(summoner -> {
            newMatch.setId(null);
            newMatch.setSummoner(summoner);
            Match createdMatch = matches.save(newMatch);
            return new MatchCreateDTO(createdMatch);
        }
        ).orElse(new MatchCreateDTO("No Summoner found by: " + summonerId));

    }

    @PutMapping("/matches/{id}")
    public String updateMatchWithId(@PathVariable Long id, @RequestBody Match matchToUpdateWith) {
        if (matches.existsById(id)) {
            matchToUpdateWith.setId(id);
            matches.save(matchToUpdateWith);
            return "Match was updated";
        } else {
            return "Match not found";
        }
    }

    @PatchMapping("/matches/{id}")
    public String patchMatchById(@PathVariable Long id, @RequestBody Match matchToUpdateWith) {
        return matches.findById(id).map(foundMatch -> {
            foundMatch.setMatchWon(matchToUpdateWith.isMatchWon());
            if (matchToUpdateWith.getTeammateSaltLevel() != 0) foundMatch.setTeammateSaltLevel(matchToUpdateWith.getTeammateSaltLevel());
            if (matchToUpdateWith.getGameComment() != null) foundMatch.setGameComment(matchToUpdateWith.getGameComment());

            matches.save(foundMatch);
            return "Match updated";
        }).orElse("Match not found");
    }

    @DeleteMapping("/matches/{id}")
    public void deleteMatchById(@PathVariable Long id) {
        matches.deleteById(id);
    }



}
