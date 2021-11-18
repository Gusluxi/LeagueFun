package dk.gusfreddy.leaguefun.models;

import lombok.Data;

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

    @Column
    private String summonerId;

}
