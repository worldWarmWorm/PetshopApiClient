package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"PetshopApiClient/client"
	"PetshopApiClient/models"

	"github.com/gin-gonic/gin"
)

// RegisterPetRoutes registers all pet-related routes
func RegisterPetRoutes(router *gin.Engine, client *client.PetstoreClient) {
	// Get pets by status
	router.GET("/api/pets/:status", func(c *gin.Context) {
		status := c.Param("status")
		pets, err := client.GetPetsByStatus(status)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, pets)
	})

	// Get pet by ID
	router.GET("/api/pet/:petId", func(c *gin.Context) {
		petID := c.Param("petId")
		id, err := strconv.ParseInt(petID, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pet ID"})
			return
		}
		
		pet, err := client.GetPetByID(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, pet)
	})

	// Add pet
	router.POST("/api/pet", func(c *gin.Context) {
		var pet models.Pet
		if err := c.ShouldBindJSON(&pet); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		newPet, err := client.AddPet(pet)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, newPet)
	})

	// Update pet
	router.PUT("/api/pet", func(c *gin.Context) {
		var pet models.Pet
		if err := c.ShouldBindJSON(&pet); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		updatedPet, err := client.UpdatePet(pet)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, updatedPet)
	})

	// Delete pet
	router.DELETE("/api/pet/:petId", func(c *gin.Context) {
		petID := c.Param("petId")
		id, err := strconv.ParseInt(petID, 10, 64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pet ID"})
			return
		}
		
		if err := client.DeletePet(id); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Pet deleted successfully"})
	})

	// Find pets by tags
	router.GET("/api/pet/findByTags", func(c *gin.Context) {
		tagsParam := c.Query("tags")
		tags := strings.Split(tagsParam, ",")
		
		pets, err := client.FindPetsByTags(tags)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, pets)
	})
}