package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/config"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/models"
)

func GetAllExpenses(c *gin.Context) {
	var expenseList []models.Expense

	if err := config.DB.Find(&expenseList).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve expenses"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"expenses": expenseList})
}

func CreateExpense(c *gin.Context) {
	var reqBody struct {
		Description string  `json:"description"`
		Amount      float64 `json:"amount"`
		Date        string  `json:"date"`
		Category    string  `json:"category"`
		BudgetID    *uint   `json:"budgetId"`
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
		UserID:      user.ID,
	}

	if err := config.DB.Create(&newExpense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create the expense"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Expense created successfully", "expense": newExpense})
}

func EditExpense(c *gin.Context) {
	var updatedExpense models.Expense
	id := c.Param("id")

	if err := c.ShouldBindJSON(&updatedExpense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Model(&models.Expense{}).Where("id=?", id).Updates(&updatedExpense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update the expense"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense updated successfully"})
}

func DeleteExpense(c *gin.Context) {
	id := c.Param("id")
	var expense models.Expense

	if err := config.DB.Delete(&expense, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete the expense"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense deleted successfully"})
}
