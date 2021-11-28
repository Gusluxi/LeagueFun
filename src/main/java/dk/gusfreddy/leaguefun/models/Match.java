package dk.gusfreddy.leaguefun.models;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Data
@Table(name="matches")
@Entity
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String matchId;

    @Column
    private boolean matchWon;

    @Column
    private String gameType;

    @Column
    private int kills;

    @Column
    private int deaths;

    @Column
    private int assists;

    @Column
    private int minionKills;

    @Column
    private int championLevel;

    @Column
    private String championName;

    @Column
    private int teammateSaltLevel;

    @Column
    private String gameComment;

    @ManyToOne
    @JoinColumn(name = "summoner_id")
    @Nullable
    private Summoner summoner;


}
