package main

import (
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	db "github.com/tanishashrivas/pocketier-expense-tracker/server/config"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	port := os.Getenv("PORT")

	if port == "" {
		log.Println("PORT environment variable not set, using default 8080")
		port = "8080"
	} else {
		log.Printf("PORT found: %s\n", port)
	}

	db.Connect()
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := r.Group("/api/v1")

	if db.DB == nil {
		log.Fatal("Database connection failed")
	}

	routes.BudgetRoutes(api)
	routes.ExpenseRoutes(api)
	routes.UserRoutes(api)

	r.Run("0.0.0.0:" + port)
	log.Println("Application started successfully!")
}
