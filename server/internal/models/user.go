package models

import "time"

type User struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	ClerkID   string    `gorm:"unique;not null" json:"clerkId"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Budgets   []Budget  `gorm:"foreignKey:UserID" json:"budgets"`
	Expenses  []Expense `gorm:"foreignKey:UserID" json:"expenses"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}
