package routers

import (
	"todo_app/service/controllers/todo"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
)

func init() {
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin"},
		AllowCredentials: true}))

	//beego.Router("/", &controllers.MainController{})
	beego.Include(&todo.TodoListController{})

	// 依據 asset-manifest.json
	beego.SetStaticPath("/", "public")

	// 各自設定
	// beego.SetStaticPath("static", "public/static")
	// beego.SetStaticPath("static/css", "public/static/css")
	// beego.SetStaticPath("static/js", "public/static/js")
	// beego.SetStaticPath("static/media", "public/static/media")
	// beego.SetStaticPath("index.css", "public/index.css")
	//beego.SetStaticPath("favicon.ico", "public/favicon.ico")
	// beego.SetStaticPath("static/index.html", "public/index.html")
}
