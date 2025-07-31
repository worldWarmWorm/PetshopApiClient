package handlers

import (
	"net/http"
	"strconv"

	"PetshopApiClient/client"
	"PetshopApiClient/models"

	"github.com/gin-gonic/gin"
)

// RegisterStoreRoutes registers all store-related routes.
func RegisterStoreRoutes(router *gin.Engine, client *client.PetstoreClient) {
	// Get store inventory
	router.GET("/api/store/inventory", func(context *gin.Context) {
		inventory, err := client.GetStoreInventory()

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, inventory)
	})

	// Place order
	router.POST("/api/store/order", func(context *gin.Context) {
		var order models.Order

		if err := context.ShouldBindJSON(&order); err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}
		
		newOrder, err := client.PlaceOrder(order)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, newOrder)
	})

	// Get order by ID
	router.GET("/api/store/order/:orderId", func(context *gin.Context) {
		orderID := context.Param("orderId")
		id, err := strconv.ParseInt(orderID, 10, 64)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid order ID"})

			return
		}
		
		order, err := client.GetOrderByID(id)

		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}

		context.JSON(http.StatusOK, order)
	})

	// Delete order
	router.DELETE("/api/store/order/:orderId", func(context *gin.Context) {
		orderID := context.Param("orderId")
		id, err := strconv.ParseInt(orderID, 10, 64)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid order ID"})

			return
		}
		
		if err := client.DeleteOrder(id); err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})

			return
		}
		
		context.JSON(http.StatusOK, gin.H{"message": "Order deleted successfully"})
	})
}