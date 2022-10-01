package main

import (
	"github.com/c-m-hunt/pool-scorebug/server/api"
	"github.com/gin-gonic/gin"
)


func main() {
	router := gin.Default()
	router.GET("/match", api.GetMatch)
	router.Run()
}