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
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
		  return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	  }))
	router.GET("/match", api.GetMatch)
	router.Run()
}