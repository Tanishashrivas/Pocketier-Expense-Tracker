package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/config"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/models"
)

func SaveUser(c *gin.Context) {
	var reqBody struct {
		ClerkID string `json:"userId"`
		Email   string `json:"email"`
		Name    string `json:"name"`
	}

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	var existingUser models.User
	if err := config.DB.Where("clerk_id = ?", reqBody.ClerkID).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusOK, gin.H{"message": "User already exists", "user": existingUser})
		return
	}

	newUser := models.User{
		ClerkID: reqBody.ClerkID,
		Name:    reqBody.Name,
		Email:   reqBody.Email,
	}

	if err := config.DB.Create(&newUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User created successfully", "user": newUser})
}
