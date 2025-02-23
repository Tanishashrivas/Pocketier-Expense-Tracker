package models

import "time"

type User struct {
	ID        uint   `gorm:"primaryKey"`
	ClerkID   string `gorm:"unique;not null"`
	Name      string
	Email     string
	Budgets   []Budget  `gorm:"foreignKey:UserID"`
	Expenses  []Expense `gorm:"foreignKey:UserID"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
