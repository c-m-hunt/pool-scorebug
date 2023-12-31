package cmd

import (
	"os"

	"github.com/c-m-hunt/pool-scorebug/server/server"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var (
	rootCmd = &cobra.Command{
		Use:   "scorebug",
		Short: `This application sets up a websocket server to serve the scorebug. See repo root for more info.`,
	}
)

func init() {
	rootCmd.AddCommand(startServerCmd)
	if os.Getenv("ENVIRONMENT") == "production" {
		log.SetLevel(log.InfoLevel)
	} else {
		log.SetLevel(log.DebugLevel)
	}
}

func Execute() error {
	return rootCmd.Execute()
}

var startServerCmd = &cobra.Command{
	Use:   "start",
	Short: "Starts the scorebug server",
	Long:  "Starts the scorebug server",
	Args:  cobra.MatchAll(cobra.MinimumNArgs(1), cobra.MaximumNArgs(2), cobra.OnlyValidArgs),
	Run: func(cmd *cobra.Command, args []string) {
		buildPath := args[0]
		var stateFile *string
		if len(args) == 2 {
			stateFile = &args[1]
		}
		log.Debug("Starting server")
		log.Debug("Build path: ", buildPath)
		log.Debug("State file: ", *stateFile)

		server.Start(server.NewConfig(
			buildPath, stateFile,
		))
	},
}
