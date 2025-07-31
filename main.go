package main

import (
	"log"
	"net/http"

	"PetshopApiClient/client"
	"PetshopApiClient/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	petstoreClient := client.NewPetstoreClient()
	router := gin.Default()

	// Enable CORS
	router.Use(func(context *gin.Context) {
		context.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3001")
		context.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		context.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if context.Request.Method == http.MethodOptions {
			context.AbortWithStatus(http.StatusNoContent)

			return
		}

		context.Next()
	})

	// Serve React app
	router.NoRoute(func(context *gin.Context) {
		context.File("frontend/build/index.html")
	})

	// Register API routes
	handlers.RegisterPetRoutes(router, petstoreClient)
	handlers.RegisterStoreRoutes(router, petstoreClient)
	handlers.RegisterUserRoutes(router, petstoreClient)

	// Start the server
	log.Println("Starting server on :8085")

	if err := router.Run(":8085"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
