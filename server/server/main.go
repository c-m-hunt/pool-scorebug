package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/c-m-hunt/pool-scorebug/server/api"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	Type string       `json:"type"`
	Data api.Scorebug `json:"data"`
}

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan Message)

func Start() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"GET", "POST"},
		AllowHeaders:  []string{"Origin", "content-type"},
		ExposeHeaders: []string{"Content-Length"},
		MaxAge:        12 * time.Hour,
	}))
	router.GET("/match", api.GetScorebug)
	router.POST("/match", func(ctx *gin.Context) {
		fmt.Println("POST /match")
		s := api.SetScorebug(ctx)
		if s != nil {
			broadcast <- Message{
				Type: "scorebug",
				Data: *s,
			}
		} else {
			return
		}
	})
	router.POST("/match/:liveGame", api.SetLiveGame)

	router.GET("/ws", handleConnections)
	go handleMessages()
	router.Run()
}

func handleConnections(ctx *gin.Context) {
	// func handleConnections(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	clients[conn] = true

	for {
		var msg Message
		err := conn.ReadJSON(&msg)
		if err != nil {
			fmt.Println(err)
			delete(clients, conn)
			return
		}

		broadcast <- msg
	}
}

func handleMessages() {
	for {
		msg := <-broadcast

		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				fmt.Println(err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
