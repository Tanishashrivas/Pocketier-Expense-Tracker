package routes

import (
	"github.com/gin-gonic/gin"
	expense "github.com/tanishashrivas/pocketier-expense-tracker/server/internal/handlers"
)

func ExpenseRoutes(router *gin.RouterGroup) {
	router.GET("/expenses", expense.GetAllExpenses)
	router.POST("/expenses", expense.CreateExpense)
	router.PUT("/expenses/:id", expense.EditExpense)
	router.DELETE("/expenses/:id", expense.DeleteExpense)
}
