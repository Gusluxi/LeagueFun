package dk.gusfreddy.leaguefun.repositories;

import dk.gusfreddy.leaguefun.models.Champion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChampionRepository extends JpaRepository<Champion, Long> {
}
