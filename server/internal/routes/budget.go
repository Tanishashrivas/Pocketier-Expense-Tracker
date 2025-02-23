package routes

import (
	"github.com/gin-gonic/gin"
	budget "github.com/tanishashrivas/pocketier-expense-tracker/server/internal/handlers"
)

func BudgetRoutes(router *gin.RouterGroup) {
	router.GET("/budgets", budget.GetAllBudgets)
	router.GET("/budgets/:id", budget.GetBudgetById)
	router.POST("/budgets", budget.CreateBudget)
	router.PUT("/budgets/:id", budget.EditBudget)
	router.DELETE("/budgets/:id", budget.DeleteBudget)
}
