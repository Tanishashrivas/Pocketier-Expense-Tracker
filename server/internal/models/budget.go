package models

import (
	"time"

	"gorm.io/gorm"
)

type Budget struct {
	// ID          uint    `gorm:"primaryKey"`
	gorm.Model
	Name        string  `gorm:"not null"`
	TotalAmount float64 `gorm:"not null"`
	StartDate   time.Time
	EndDate     time.Time
	UserID      uint      `gorm:"not null"`
	Expenses    []Expense `gorm:"foreignKey:BudgetID"`
	// CreatedAt   time.Time
	// UpdatedAt   time.Time
}
