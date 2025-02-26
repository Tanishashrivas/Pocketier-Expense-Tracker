package routes

import (
	"github.com/gin-gonic/gin"
	user "github.com/tanishashrivas/pocketier-expense-tracker/server/internal/handlers"
)

func UserRoutes(router *gin.RouterGroup) {
	router.POST("/user", user.SaveUser)
}
