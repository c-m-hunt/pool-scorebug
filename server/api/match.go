package api

import (
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type Scorebug struct {
	Match  `json:"match"`
	Config `json:"config"`
	Games  []Game `json:"games"`
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
}

type Game struct {
	HomePlayer string `json:"homePlayer"`
	AwayPlayer string `json:"awayPlayer"`
	HomeScore  int    `json:"homeScore"`
	AwayScore  int    `json:"awayScore"`
	Live       bool   `json:"live"`
	HomeColur  string `json:"homeColour"`
}

var scorebug *Scorebug = &Scorebug{
	Config: Config{
		ShowTeamScore:   true,
		ShowPlayerScore: true,
	},
}

func SaveState(path *string, scorebug Scorebug) error {
	if path != nil {
		log.Debug("Saving state to ", *path)

		// Save scorebug JSON to file
		b, err := json.Marshal(scorebug)
		if err != nil {
			return err
		}

		// Write to file
		err = os.WriteFile(*path, b, 0644)
		if err != nil {
			return err
		}

		return nil
	}
	return nil
}

func LoadState(path *string) error {
	if path == nil {
		return nil
	}
	// If file exists
	if _, err := os.Stat(*path); err == nil {
		log.Debug("Loading state from ", *path)
		// Read file
		b, err := os.ReadFile(*path)
		if err != nil {
			return err
		}

		// Unmarshal JSON
		err = json.Unmarshal(b, &scorebug)
		if err != nil {
			return err
		}

		return nil
	} else {
		log.Debug("No state file found at ", *path)
		log.Debug("Using default state")
		return nil
	}
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
	if err := s.Validate(); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return nil
	}
	scorebug = &s
	c.JSON(http.StatusOK, s)
	return &s
}

func ResetState(c *gin.Context) {
	scorebug = &Scorebug{
		Config: Config{
			ShowTeamScore:   true,
			ShowPlayerScore: true,
		},
	}
	c.JSON(http.StatusOK, scorebug)
}

func SetLiveGame(c *gin.Context) {
	lg, err := strconv.Atoi(c.Params.ByName("liveGame"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	foundGame := false
	for i, game := range scorebug.Games {
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

func (s Scorebug) Validate() error {
	m := s.Match
	g := s.Games
	if m.HomeTeam == "" || m.AwayTeam == "" {
		return errors.New("Teams must be set")
	}
	for _, game := range g {
		if game.HomePlayer == "" || game.AwayPlayer == "" {
			return errors.New("Players must be set")
		}
	}
	liveCount := 0
	for _, game := range g {
		if game.Live {
			liveCount++
		}
	}
	if liveCount > 1 {
		return errors.New("Only one game can be live")
	}
	return nil
}
