func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	fmt.Println("🚀 Render Environment Variables:")
	for _, e := range os.Environ() {
		fmt.Println(e)
	}

	log.Println("🛠 App is starting...")

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Println("⚠️ PORT not set, using default 8080")
		port = "8080"
	}

	log.Printf("✅ Running on PORT: %s", port)

	db.Connect()
	if db.DB == nil {
		log.Fatal("❌ Database connection failed")
	}

	// Create router
	r := gin.Default()

	log.Println("🌍 Setting up routes...")

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := r.Group("/api/v1")

	routes.BudgetRoutes(api)
	routes.ExpenseRoutes(api)
	routes.UserRoutes(api)

	log.Println("✅ Routes setup done. Starting server...")

	err := r.Run("0.0.0.0:" + port)
	if err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}

	log.Println("🚀 Application started successfully!")
}
