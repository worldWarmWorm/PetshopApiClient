package handlers

import (
	"net/http"
	"strconv"
	"strings"

	"PetshopApiClient/client"
	"PetshopApiClient/models"

	"github.com/gin-gonic/gin"
)

// RegisterPetRoutes registers all pet-related routes.
func RegisterPetRoutes(router *gin.Engine, client *client.PetstoreClient) {
	// Get pets by status
	router.GET("/api/pets/:status", func(context *gin.Context) {
		status := context.Param("status")
		pets, err := client.GetPetsByStatus(status)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, pets)
	})

	// Get pet by ID
	router.GET("/api/pet/:petId", func(context *gin.Context) {
		petID := context.Param("petId")
		id, err := strconv.ParseInt(petID, 10, 64)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pet ID"})

			return
		}
		
		pet, err := client.GetPetByID(id)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, pet)
	})

	// Add pet
	router.POST("/api/pet", func(context *gin.Context) {
		var pet models.Pet

		if err := context.ShouldBindJSON(&pet); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}
		
		newPet, err := client.AddPet(pet)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, newPet)
	})

	// Update pet
	router.PUT("/api/pet", func(context *gin.Context) {
		var pet models.Pet

		if err := context.ShouldBindJSON(&pet); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}
		
		updatedPet, err := client.UpdatePet(pet)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, updatedPet)
	})

	// Delete pet
	router.DELETE("/api/pet/:petId", func(context *gin.Context) {
		petID := context.Param("petId")
		id, err := strconv.ParseInt(petID, 10, 64)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid pet ID"})

			return
		}
		
		if err := client.DeletePet(id); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "Pet deleted successfully"})
	})

	// Find pets by tags
	router.GET("/api/pet/findByTags", func(context *gin.Context) {
		tagsParam := context.Query("tags")
		tags := strings.Split(tagsParam, ",")
		pets, err := client.FindPetsByTags(tags)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, pets)
	})
}