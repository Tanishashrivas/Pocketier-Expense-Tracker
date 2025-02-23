package models

import (
	"time"

	"gorm.io/gorm"
)

type Expense struct {
	// ID          uint      `gorm:"primaryKey"`
	gorm.Model
	Description string    `gorm:"not null"`
	Amount      float64   `gorm:"not null"`
	Date        time.Time `gorm:"not null"`
	Category    string
	BudgetID    *uint
	UserID      uint `gorm:"not null"`
	// CreatedAt   time.Time
	// UpdatedAt   time.Time
}
