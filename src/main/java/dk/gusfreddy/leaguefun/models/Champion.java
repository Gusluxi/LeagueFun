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
    private String name;

    @Column
    private String championTitle;

    @Column
    private String championParType;

    @Column
    private String championComment;
}
