package handlers

import (
	"net/http"

	"PetshopApiClient/internal/client"
	"PetshopApiClient/internal/models"

	"github.com/gin-gonic/gin"
)

// RegisterUserRoutes registers all user-related routes.
func RegisterUserRoutes(router *gin.Engine, client *client.PetstoreClient) {
	// Get user by username
	router.GET("/api/user/:username", func(context *gin.Context) {
		username := context.Param("username")
		user, err := client.GetUserByUsername(username)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, user)
	})

	// Create user
	router.POST("/api/user", func(context *gin.Context) {
		var user models.User

		if err := context.ShouldBindJSON(&user); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}
		
		if err := client.CreateUser(user); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
	})

	// Create users with an array
	router.POST("/api/user/createWithArray", func(context *gin.Context) {
		var users []models.User

		if err := context.ShouldBindJSON(&users); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}
		
		if err := client.CreateUsersWithArray(users); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "Users created successfully"})
	})

	// Create users with a list
	router.POST("/api/user/createWithList", func(context *gin.Context) {
		var users []models.User

		if err := context.ShouldBindJSON(&users); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}
		
		if err := client.CreateUsersWithList(users); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "Users created successfully"})
	})

	// Update user
	router.PUT("/api/user/:username", func(context *gin.Context) {
		username := context.Param("username")

		var user models.User

		if err := context.ShouldBindJSON(&user); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}
		
		if err := client.UpdateUser(username, user); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
	})

	// Delete user
	router.DELETE("/api/user/:username", func(context *gin.Context) {
		username := context.Param("username")
		
		if err := client.DeleteUser(username); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
	})

	// Login user
	router.GET("/api/user/login", func(context *gin.Context) {
		username := context.Query("username")
		password := context.Query("password")
		message, err := client.LoginUser(username, password)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": message})
	})

	// Logout user
	router.GET("/api/user/logout", func(context *gin.Context) {
		if err := client.LogoutUser(); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, gin.H{"message": "User logged out successfully"})
	})
}