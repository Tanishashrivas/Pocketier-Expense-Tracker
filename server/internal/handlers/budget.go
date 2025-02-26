package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/config"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/models"
)

func GetAllBudgets(c *gin.Context) {
	var budgetList []models.Budget

	if err := config.DB.Find(&budgetList).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve budgets"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"budgets": budgetList})
}

func GetBudgetById(c *gin.Context) {
	id := c.Param("id")
	var budget models.Budget

	if err := config.DB.First(&budget, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve the budget"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"budget": budget})
}

func CreateBudget(c *gin.Context) {
	var reqBody struct {
		Name        string  `json:"name"`
		TotalAmount float64 `json:"totalAmount"`
		StartDate   string  `json:"startDate"`
		EndDate     string  `json:"endDate"`
		UserID      string  `json:"userId"`
	}

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var user models.User
	if err := config.DB.Where("clerk_id = ?", reqBody.UserID).First(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}

	startDate, err := time.Parse(time.RFC3339, reqBody.StartDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start date format"})
		return
	}
	endDate, err := time.Parse(time.RFC3339, reqBody.EndDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end date format"})
		return
	}

	newBudget := models.Budget{
		Name:        reqBody.Name,
		TotalAmount: reqBody.TotalAmount,
		StartDate:   startDate,
		EndDate:     endDate,
		UserID:      user.ID,
	}

	if err := config.DB.Create(&newBudget).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create the budget"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Budget created successfully", "budget": newBudget})
}

func EditBudget(c *gin.Context) {
	var updatedBudget models.Budget
	id := c.Param("id")

	if err := c.ShouldBindJSON(&updatedBudget); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Model(&models.Budget{}).Where("id=?", id).Updates(&updatedBudget).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update the budget"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Budget updated successfully"})
}

func DeleteBudget(c *gin.Context) {
	id := c.Param("id")
	var budget models.Budget

	if err := config.DB.Delete(&budget, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete the budget"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Budget deleted successfully"})
}
