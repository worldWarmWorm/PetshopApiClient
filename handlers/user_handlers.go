package handlers

import (
	"net/http"

	"PetshopApiClient/client"
	"PetshopApiClient/models"

	"github.com/gin-gonic/gin"
)

// RegisterUserRoutes registers all user-related routes
func RegisterUserRoutes(router *gin.Engine, client *client.PetstoreClient) {
	// Get user by username
	router.GET("/api/user/:username", func(c *gin.Context) {
		username := c.Param("username")
		user, err := client.GetUserByUsername(username)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, user)
	})

	// Create user
	router.POST("/api/user", func(c *gin.Context) {
		var user models.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		if err := client.CreateUser(user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
	})

	// Create users with array
	router.POST("/api/user/createWithArray", func(c *gin.Context) {
		var users []models.User
		if err := c.ShouldBindJSON(&users); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		if err := client.CreateUsersWithArray(users); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Users created successfully"})
	})

	// Create users with list
	router.POST("/api/user/createWithList", func(c *gin.Context) {
		var users []models.User
		if err := c.ShouldBindJSON(&users); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		if err := client.CreateUsersWithList(users); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Users created successfully"})
	})

	// Update user
	router.PUT("/api/user/:username", func(c *gin.Context) {
		username := c.Param("username")
		var user models.User
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		if err := client.UpdateUser(username, user); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User updated successfully"})
	})

	// Delete user
	router.DELETE("/api/user/:username", func(c *gin.Context) {
		username := c.Param("username")
		
		if err := client.DeleteUser(username); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
	})

	// Login user
	router.GET("/api/user/login", func(c *gin.Context) {
		username := c.Query("username")
		password := c.Query("password")
		
		message, err := client.LoginUser(username, password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": message})
	})

	// Logout user
	router.GET("/api/user/logout", func(c *gin.Context) {
		if err := client.LogoutUser(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "User logged out successfully"})
	})
}