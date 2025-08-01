package models

// Pet represents a pet from the Petstore API.
type Pet struct {
	ID        int64    `json:"id"`
	Name      string   `json:"name"`
	Category  Category `json:"category"`
	PhotoURLs []string `json:"photoUrls"`
	Tags      []Tag    `json:"tags"`
	Status    string   `json:"status"`
}

// Category represents a pet category.
type Category struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

// Tag represents a pet tag.
type Tag struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

// Store represents store inventory.
type Store struct {
	Inventory map[string]int `json:"inventory"`
}

// User represents a user in the system.
type User struct {
	ID         int64  `json:"id"`
	Username   string `json:"username"`
	FirstName  string `json:"firstName"`
	LastName   string `json:"lastName"`
	Email      string `json:"email"`
	Password   string `json:"password"`
	Phone      string `json:"phone"`
	UserStatus int    `json:"userStatus"`
}

// Order represents a store order.
type Order struct {
	ID       int64  `json:"id"`
	PetID    int64  `json:"petId"`
	Quantity int    `json:"quantity"`
	ShipDate string `json:"shipDate"`
	Status   string `json:"status"`
	Complete bool   `json:"complete"`
}

// ApiResponse represents the API response.
type ApiResponse struct {
	Code    int    `json:"code"`
	Type    string `json:"type"`
	Message string `json:"message"`
}