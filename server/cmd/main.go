package main

import (
	"fmt"
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
	// Force log output to appear on Render
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	// Debug: Print all environment variables
	fmt.Println("🚀 Render Environment Variables:")
	for _, e := range os.Environ() {
		fmt.Println(e)
	}

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatal("❌ PORT environment variable not set! Render will fail.")
	}

	log.Printf("✅ Running on PORT: %s\n", port)

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

	log.Printf("🌍 Server starting on port: %s\n", port)
	log.Println("🔥 If this is missing in logs, Render is not setting the PORT variable!")

	r.Run(":" + port)
}
