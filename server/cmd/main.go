package main

import (
	"log"

	db "github.com/tanishashrivas/pocketier-expense-tracker/server/config"
)

func main() {
	db.Connect()

	if db.DB == nil {
		log.Fatal("Database connection failed")
	}

	log.Println("Application started successfully!")
}
