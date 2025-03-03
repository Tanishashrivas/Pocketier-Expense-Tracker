package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/config"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/models"
)

func GetAllExpenses(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var expenseList []models.Expense
	if err := config.DB.Where("user_id = ?", userID).Find(&expenseList).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve expenses"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"expenses": expenseList})
}

func CreateExpense(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var reqBody struct {
		Description string  `json:"description"`
		Amount      float64 `json:"amount"`
		Date        string  `json:"date"`
		Category    string  `json:"category"`
		BudgetID    *uint   `json:"budgetId"`
	}

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	date, err := time.Parse(time.RFC3339, reqBody.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format"})
		return
	}

	newExpense := models.Expense{
		Description: reqBody.Description,
		Amount:      reqBody.Amount,
		Date:        date,
		Category:    reqBody.Category,
		BudgetID:    reqBody.BudgetID,
		UserID:      userID.(uint),
	}

	if err := config.DB.Create(&newExpense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create the expense"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Expense created successfully", "expense": newExpense})
}

func EditExpense(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	id := c.Param("id")
	var existingExpense models.Expense

	if err := config.DB.Where("id = ? AND user_id = ?", id, userID).First(&existingExpense).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Expense not found or unauthorized"})
		return
	}

	var updatedExpense models.Expense
	if err := c.ShouldBindJSON(&updatedExpense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Model(&existingExpense).Updates(updatedExpense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update the expense"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense updated successfully"})
}

func DeleteExpense(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	id := c.Param("id")
	var expense models.Expense

	if err := config.DB.Where("id = ? AND user_id = ?", id, userID).First(&expense).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Expense not found or unauthorized"})
		return
	}

	if err := config.DB.Delete(&expense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete the expense"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense deleted successfully"})
}
