package main

import (
	"log"

	"github.com/gin-gonic/gin"
	db "github.com/tanishashrivas/pocketier-expense-tracker/server/config"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/routes"
)

func main() {
	db.Connect()
	r := gin.Default()
	api := r.Group("/api/v1")

	if db.DB == nil {
		log.Fatal("Database connection failed")
	}

	routes.BudgetRoutes(api)
	routes.ExpenseRoutes(api)

	r.Run(":8080")
	log.Println("Application started successfully!")
}
