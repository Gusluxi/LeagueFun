package dk.gusfreddy.leaguefun.repositories;

import dk.gusfreddy.leaguefun.models.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, Long> {
}
