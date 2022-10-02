package api

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Match struct {
	HomeTeam string `json:"homeTeam"`
	AwayTeam string `json:"awayTeam"`
	HomeScore int `json:"homeScore"`
	AwayScore int `json:"awayScore"`
	Games []Game `json:"games"`
}

type Game struct {
	HomePlayer string `json:"homePlayer"`
	AwayPlayer string `json:"awayPlayer"`
	HomeScore int `json:"homeScore"`
	AwayScore int `json:"awayScore"`
	Live bool `json:"live"`
	HomeColur string `json:"homeColour"`
}

var match Match = Match{}

func GetMatch(c *gin.Context) {
	c.JSON(http.StatusOK, match)
}

func SetMatch(c *gin.Context) {
	m := Match{}
	err:= c.BindJSON(&m)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := m.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	match = m
	c.JSON(http.StatusOK, match)
}

func SetLiveGame(c *gin.Context) {
	lg, err := strconv.Atoi( c.Params.ByName("liveGame"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	foundGame := false
	for i, game := range match.Games {
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
	c.JSON(http.StatusOK, match)
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