package dk.gusfreddy.leaguefun.DTO.response;

import dk.gusfreddy.leaguefun.models.Match;

public class MatchCreateDTO {

    public Match match;
    public boolean failed;
    public String errorMessage;

    // success case
    public MatchCreateDTO(Match match) {
        this.match = match;
    }

    // failure case
    public MatchCreateDTO(String errorMessage) {
        this.errorMessage = errorMessage;
        this.failed = true;
    }

}
