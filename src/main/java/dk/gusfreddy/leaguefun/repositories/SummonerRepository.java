package dk.gusfreddy.leaguefun.repositories;

import dk.gusfreddy.leaguefun.models.Summoner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SummonerRepository extends JpaRepository<Summoner, Long> {
}
