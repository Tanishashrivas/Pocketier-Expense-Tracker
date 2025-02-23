package models

import "time"

type Budget struct {
	ID          uint    `gorm:"primaryKey"`
	Name        string  `gorm:"not null"`
	TotalAmount float64 `gorm:"not null"`
	StartDate   time.Time
	EndDate     time.Time
	UserID      uint      `gorm:"not null"`
	Expenses    []Expense `gorm:"foreignKey:BudgetID"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
