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
	log.Println("🚀 Service is starting...")

	// Debug: Print environment variables
	fmt.Println("🌍 ENV Variables:")
	for _, e := range os.Environ() {
		fmt.Println(e)
	}

	if err := godotenv.Load(); err != nil {
		log.Println("⚠️ No .env file found, using system ENV variables")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("⚠️ PORT environment variable not set, using default 8080")
		port = "8080"
	} else {
		log.Printf("✅ Found PORT: %s\n", port)
	}

	// 🚀 Debug DB connection
	log.Println("🔍 Connecting to Database...")
	db.Connect()
	if db.DB == nil {
		log.Fatal("❌ Database connection failed")
	}

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

	routes.BudgetRoutes(api)
	routes.ExpenseRoutes(api)
	routes.UserRoutes(api)

	log.Printf("🚀 Server running on 0.0.0.0:%s", port)
	err := r.Run("0.0.0.0:" + port)
	if err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}
