package api

import "github.com/gin-gonic/gin"


func GetMatch(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}