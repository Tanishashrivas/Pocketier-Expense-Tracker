package handlers

import (
	"net/http"

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
	var newBudget models.Budget

	if err := c.ShouldBindJSON(&newBudget); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := config.DB.Create(&newBudget).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create the budget"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Budget created successfully"})
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
