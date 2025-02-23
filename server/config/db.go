package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DATABASE_URL")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	err = db.AutoMigrate(&models.Budget{}, &models.Expense{})
	if err != nil {
		log.Fatal("Migration failed:", err)
	}

	DB = db
	log.Println("Database connected successfully!")
}
