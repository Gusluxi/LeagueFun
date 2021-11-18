package dk.gusfreddy.leaguefun.controllers;

import dk.gusfreddy.leaguefun.models.Match;
import dk.gusfreddy.leaguefun.repositories.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Matches {

    @Autowired
    MatchRepository matches;

    @GetMapping("/matches")
    public Iterable<Match> getMatches() {
        return matches.findAll();
    }

    @GetMapping("/matches/{id}")
    public Match getMatch(@PathVariable Long id) {
        return matches.findById(id).get();
    }

    @PostMapping("/matches")
    public Match addMatch(@RequestBody Match newMatch) {
        // don't allow the client to overwrite the id
        newMatch.setId(null);
        return matches.save(newMatch);
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
            if (matchToUpdateWith.getMatchId() != null) foundMatch.setMatchId(matchToUpdateWith.getMatchId());
            if (matchToUpdateWith.getGameType() != null) foundMatch.setGameType(matchToUpdateWith.getGameType());
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
