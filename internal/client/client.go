package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"PetshopApiClient/internal/models"
)

// PetstoreClient handles API requests to the Petstore API.
type PetstoreClient struct {
	BaseURL    string
	HTTPClient *http.Client
}

// NewPetstoreClient creates a new Petstore API client.
func NewPetstoreClient() *PetstoreClient {
	return &PetstoreClient{
		BaseURL: "https://petstore.swagger.io/v2",
		HTTPClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// GetPetsByStatus fetches pets by their status.
func (client *PetstoreClient) GetPetsByStatus(status string) ([]models.Pet, error) {
	url := fmt.Sprintf("%s/pet/findByStatus?status=%s", client.BaseURL, status)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var pets []models.Pet

	if err := json.Unmarshal(body, &pets); err != nil {
		return nil, err
	}

	return pets, nil
}

// GetStoreInventory fetches the store inventory.
func (client *PetstoreClient) GetStoreInventory() (map[string]int, error) {
	url := fmt.Sprintf("%s/store/inventory", client.BaseURL)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var inventory map[string]int

	if err := json.Unmarshal(body, &inventory); err != nil {
		return nil, err
	}

	return inventory, nil
}

// GetUserByUsername fetches a user by username.
func (client *PetstoreClient) GetUserByUsername(username string) (*models.User, error) {
	url := fmt.Sprintf("%s/user/%s", client.BaseURL, username)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var user models.User

	if err := json.Unmarshal(body, &user); err != nil {
		return nil, err
	}

	return &user, nil
}

// GetPetByID fetches a pet by ID.
func (client *PetstoreClient) GetPetByID(petID int64) (*models.Pet, error) {
	url := fmt.Sprintf("%s/pet/%d", client.BaseURL, petID)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var pet models.Pet

	if err := json.Unmarshal(body, &pet); err != nil {
		return nil, err
	}

	return &pet, nil
}

// AddPet adds a new pet to the store.
func (client *PetstoreClient) AddPet(pet models.Pet) (*models.Pet, error) {
	url := fmt.Sprintf("%s/pet", client.BaseURL)
	petJSON, err := json.Marshal(pet)

	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(petJSON))

	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var newPet models.Pet

	if err := json.Unmarshal(body, &newPet); err != nil {
		return nil, err
	}

	return &newPet, nil
}

// UpdatePet updates an existing pet.
func (client *PetstoreClient) UpdatePet(pet models.Pet) (*models.Pet, error) {
	url := fmt.Sprintf("%s/pet", client.BaseURL)
	petJSON, err := json.Marshal(pet)

	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(petJSON))

	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var updatedPet models.Pet

	if err := json.Unmarshal(body, &updatedPet); err != nil {
		return nil, err
	}

	return &updatedPet, nil
}

// DeletePet deletes a pet.
func (client *PetstoreClient) DeletePet(petID int64) error {
	url := fmt.Sprintf("%s/pet/%d", client.BaseURL, petID)
	req, err := http.NewRequest(http.MethodDelete, url, nil)

	if err != nil {
		return err
	}

	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}

// FindPetsByTags finds pets by tags.
func (client *PetstoreClient) FindPetsByTags(tags []string) ([]models.Pet, error) {
	tagsParam := strings.Join(tags, ",")
	url := fmt.Sprintf("%s/pet/findByTags?tags=%s", client.BaseURL, tagsParam)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var pets []models.Pet

	if err := json.Unmarshal(body, &pets); err != nil {
		return nil, err
	}

	return pets, nil
}

// UploadPetImage uploads an image for a pet.
func (client *PetstoreClient) UploadPetImage(petID int64, additionalMetadata string, fileData []byte) (*models.ApiResponse, error) {
	url := fmt.Sprintf("%s/pet/%d/uploadImage", client.BaseURL, petID)

	// Create new multipart form data
	body := &bytes.Buffer{}

	// Add form fields
	if additionalMetadata != "" {
		body.WriteString(fmt.Sprintf("additionalMetadata=%s&", additionalMetadata))
	}

	// Add file data if provided
	if fileData != nil {
		body.Write(fileData)
	}

	req, err := http.NewRequest(http.MethodPost, url, body)

	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "multipart/form-data")
	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	respBody, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var apiResponse models.ApiResponse

	if err := json.Unmarshal(respBody, &apiResponse); err != nil {
		return nil, err
	}

	return &apiResponse, nil
}

// PlaceOrder places an order for a pet.
func (client *PetstoreClient) PlaceOrder(order models.Order) (*models.Order, error) {
	url := fmt.Sprintf("%s/store/order", client.BaseURL)
	orderJSON, err := json.Marshal(order)

	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(orderJSON))

	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var newOrder models.Order

	if err := json.Unmarshal(body, &newOrder); err != nil {
		return nil, err
	}

	return &newOrder, nil
}

// GetOrderByID fetches an order by ID.
func (client *PetstoreClient) GetOrderByID(orderID int64) (*models.Order, error) {
	url := fmt.Sprintf("%s/store/order/%d", client.BaseURL, orderID)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}

	var order models.Order

	if err := json.Unmarshal(body, &order); err != nil {
		return nil, err
	}

	return &order, nil
}

// DeleteOrder deletes an order by ID.
func (client *PetstoreClient) DeleteOrder(orderID int64) error {
	url := fmt.Sprintf("%s/store/order/%d", client.BaseURL, orderID)
	req, err := http.NewRequest(http.MethodDelete, url, nil)

	if err != nil {
		return err
	}

	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}

// CreateUser creates a new user.
func (client *PetstoreClient) CreateUser(user models.User) error {
	url := fmt.Sprintf("%s/user", client.BaseURL)
	userJSON, err := json.Marshal(user)

	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(userJSON))

	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}

// CreateUsersWithArray creates a list of users with a given input array.
func (client *PetstoreClient) CreateUsersWithArray(users []models.User) error {
	url := fmt.Sprintf("%s/user/createWithArray", client.BaseURL)
	usersJSON, err := json.Marshal(users)

	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(usersJSON))

	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}

// CreateUsersWithList creates a list of users with a given input array.
func (client *PetstoreClient) CreateUsersWithList(users []models.User) error {
	url := fmt.Sprintf("%s/user/createWithList", client.BaseURL)
	usersJSON, err := json.Marshal(users)

	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(usersJSON))

	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}

// UpdateUser updates a user.
func (client *PetstoreClient) UpdateUser(username string, user models.User) error {
	url := fmt.Sprintf("%s/user/%s", client.BaseURL, username)
	userJSON, err := json.Marshal(user)

	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(userJSON))

	if err != nil {
		return err
	}

	req.Header.Set("Content-Type", "application/json")
	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}

// DeleteUser deletes a user.
func (client *PetstoreClient) DeleteUser(username string) error {
	url := fmt.Sprintf("%s/user/%s", client.BaseURL, username)
	req, err := http.NewRequest(http.MethodDelete, url, nil)

	if err != nil {
		return err
	}

	resp, err := client.HTTPClient.Do(req)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}

// LoginUser logs user into the system.
func (client *PetstoreClient) LoginUser(username, password string) (string, error) {
	url := fmt.Sprintf("%s/user/login?username=%s&password=%s", client.BaseURL, username, password)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return "", err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)

	if err != nil {
		return "", err
	}

	return string(body), nil
}

// LogoutUser logs out current logged in user session.
func (client *PetstoreClient) LogoutUser() error {
	url := fmt.Sprintf("%s/user/logout", client.BaseURL)
	resp, err := client.HTTPClient.Get(url)

	if err != nil {
		return err
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("API request failed with status code: %d", resp.StatusCode)
	}

	return nil
}
