package handlers

import (
	"net/http"

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
	var newExpense models.Expense

	if err := c.ShouldBindJSON(&newExpense); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&newExpense).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create the expense"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Expense created successfully"})
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
