package main

import (
	"time"

	"github.com/c-m-hunt/pool-scorebug/server/api"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "content-type"},
		ExposeHeaders:    []string{"Content-Length"},
		MaxAge: 12 * time.Hour,
	  }))
	router.GET("/match", api.GetMatch)
	router.POST("/match", api.SetMatch)
	router.POST("/match/:liveGame", api.SetLiveGame)
	router.Run()
}