package main

import (
	"log"

	"PetshopApiClient/client"
	"PetshopApiClient/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize the Petstore client
	petstoreClient := client.NewPetstoreClient()

	// Set up Gin router
	router := gin.Default()

	// Enable CORS
	router.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3001")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Serve React app
	router.NoRoute(func(c *gin.Context) {
		c.File("frontend/build/index.html")
	})

	// Register API routes
	handlers.RegisterPetRoutes(router, petstoreClient)
	handlers.RegisterStoreRoutes(router, petstoreClient)
	handlers.RegisterUserRoutes(router, petstoreClient)

	// Start the server
	log.Println("Starting server on :8081")
	if err := router.Run(":8081"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
