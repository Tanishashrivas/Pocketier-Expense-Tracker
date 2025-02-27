package config

import (
	"log"
	"os"

	"github.com/tanishashrivas/pocketier-expense-tracker/server/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("❌ DATABASE_URL not set")
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	err = db.AutoMigrate(&models.User{}, &models.Budget{}, &models.Expense{})
	if err != nil {
		log.Fatal("❌ Migration failed:", err)
	}

	DB = db
	log.Println("✅ Database connected successfully!")
}
