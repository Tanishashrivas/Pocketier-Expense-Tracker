package models

import (
	"time"

	"gorm.io/gorm"
)

type Budget struct {
	gorm.Model
	Name        string    `gorm:"not null" json:"name"`
	TotalAmount float64   `gorm:"not null" json:"totalAmount"`
	StartDate   time.Time `json:"startDate"`
	EndDate     time.Time `json:"endDate"`
	UserID      uint      `gorm:"not null" json:"userId"`
	Expenses    []Expense `gorm:"foreignKey:BudgetID" json:"expenses"`
}
