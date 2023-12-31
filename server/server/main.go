package server

import (
	"fmt"
	"net/http"
	"time"

	"github.com/c-m-hunt/pool-scorebug/server/api"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	log "github.com/sirupsen/logrus"
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

type Config struct {
	buildPath string
	stateFile *string
}

func NewConfig(buildPath string, stateFile *string) Config {
	return Config{
		buildPath: buildPath,
		stateFile: stateFile,
	}
}

func Start(config Config) {
	api.LoadState(config.stateFile)
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"*"},
		AllowMethods:  []string{"GET", "POST"},
		AllowHeaders:  []string{"Origin", "content-type"},
		ExposeHeaders: []string{"Content-Length"},
		MaxAge:        12 * time.Hour,
	}))

	// Static routes
	r.Static("/admin", "../client/build")
	r.Static("/scorebug", "../client/build")
	r.Static("/static", "../client/build/static")
	r.GET("/match", api.GetScorebug)
	r.POST("/match", func(ctx *gin.Context) {
		scorebug := api.SetScorebug(ctx)
		err := api.SaveState(config.stateFile, *scorebug)
		if err != nil {
			log.Error(err)
		}
		if scorebug != nil {
			broadcast <- Message{
				Type: "scorebug",
				Data: *scorebug,
			}
		} else {
			return
		}
	})
	r.POST("/match/:liveGame", api.SetLiveGame)
	r.GET("/reset", api.ResetState)

	// Websocket routes
	r.GET("/ws", handleConnections)
	go handleMessages()

	// Start server
	r.Run()
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
