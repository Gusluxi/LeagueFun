package dk.gusfreddy.leaguefun.repositories;

import dk.gusfreddy.leaguefun.models.Match;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MatchRepository extends JpaRepository<Match, Long> {

    @Query(value = "SELECT * FROM matches WHERE summoner_id = ?;", nativeQuery = true)
    List<Match> findMatchesBySummonerId(long summonerId);
}
