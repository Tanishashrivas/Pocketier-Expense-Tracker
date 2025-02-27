package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	db "github.com/tanishashrivas/pocketier-expense-tracker/server/config"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/routes"
)

func main() {
	log.Println("🚀 Service is starting...")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	db.Connect()
	if db.DB == nil {
		log.Fatal("❌ Database connection failed")
	}

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := r.Group("/api/v1")
	routes.BudgetRoutes(api)
	routes.ExpenseRoutes(api)
	routes.UserRoutes(api)

	log.Printf("🚀 Server running on port %s", port)
	if err := r.Run("0.0.0.0:" + port); err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}
