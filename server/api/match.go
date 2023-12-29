package api

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Scorebug struct {
	Match  `json:"match"`
	Config `json:"config"`
}

type Config struct {
	ShowTeamScore   bool `json:"showTeamScore"`
	ShowPlayerScore bool `json:"showPlayerScore"`
}

type Match struct {
	HomeTeam  string `json:"homeTeam"`
	AwayTeam  string `json:"awayTeam"`
	HomeScore int    `json:"homeScore"`
	AwayScore int    `json:"awayScore"`
	Games     []Game `json:"games"`
}

type Game struct {
	HomePlayer string `json:"homePlayer"`
	AwayPlayer string `json:"awayPlayer"`
	HomeScore  int    `json:"homeScore"`
	AwayScore  int    `json:"awayScore"`
	Live       bool   `json:"live"`
	HomeColur  string `json:"homeColour"`
}

var scorebug Scorebug = Scorebug{
	Config: Config{
		ShowTeamScore:   true,
		ShowPlayerScore: true,
	},
}

func GetScorebug(c *gin.Context) {
	c.JSON(http.StatusOK, scorebug)
}

func SetScorebug(c *gin.Context) *Scorebug {
	s := Scorebug{}
	err := c.BindJSON(&s)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return nil
	}
	if err := s.Match.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return nil
	}
	scorebug = s
	c.JSON(http.StatusOK, s)
	return &s
}

func SetLiveGame(c *gin.Context) {
	lg, err := strconv.Atoi(c.Params.ByName("liveGame"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	foundGame := false
	for i, game := range scorebug.Match.Games {
		if i == lg {
			foundGame = true
			game.Live = true
		} else {
			game.Live = false
		}
	}
	if !foundGame {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Game not found"})
		return
	}
	c.JSON(http.StatusOK, scorebug)
}

func (m Match) Validate() error {
	if m.HomeTeam == "" || m.AwayTeam == "" {
		return errors.New("Teams must be set")
	}
	for _, game := range m.Games {
		if game.HomePlayer == "" || game.AwayPlayer == "" {
			return errors.New("Players must be set")
		}
	}
	liveCount := 0
	for _, game := range m.Games {
		if game.Live {
			liveCount++
		}
	}
	if liveCount > 1 {
		return errors.New("Only one game can be live")
	}
	return nil
}
