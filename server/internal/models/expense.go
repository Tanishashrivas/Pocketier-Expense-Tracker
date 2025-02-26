package models

import (
	"time"

	"gorm.io/gorm"
)

type Expense struct {
	gorm.Model
	Description string    `gorm:"not null" json:"description"`
	Amount      float64   `gorm:"not null" json:"amount"`
	Date        time.Time `gorm:"not null" json:"date"`
	Category    string    `json:"category"`
	BudgetID    *uint     `json:"budgetId"`
	UserID      uint      `gorm:"not null" json:"userId"`
}
