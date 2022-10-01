package api

import (
	"net/http"

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

var match Match = Match{
	HomeTeam: "Outlaws",
	AwayTeam: "The Firm",
	HomeScore: 3,
	AwayScore: 1,
	Games: []Game{
		{
			HomePlayer: "Chris",
			AwayPlayer: "John",
			HomeScore: 1,
			AwayScore: 0,
			Live: true,
			HomeColur: "red",
		},
	},
}


func GetMatch(c *gin.Context) {
	c.JSON(http.StatusOK, match)
}