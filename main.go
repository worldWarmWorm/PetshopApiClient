package main

import (
	"log"
	"net/http"

	"PetshopApiClient/client"
	"PetshopApiClient/handlers"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize the Petstore client
	petstoreClient := client.NewPetstoreClient()

	// Set up Gin router
	router := gin.Default()

	// Load HTML templates
	router.LoadHTMLGlob("templates/*")

	// Serve static files
	router.Static("/static", "./static")

	// Define routes
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Petstore API Client",
		})
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
