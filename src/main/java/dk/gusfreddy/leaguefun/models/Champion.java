package dk.gusfreddy.leaguefun.models;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;


@Data
@Table(name="champions")
@Entity
public class Champion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private int championId;

    @Column
    private int championLevel;

    @ManyToOne
    @JoinColumn(name = "summoner_id")
    @Nullable
    private Summoner summoner;

}
