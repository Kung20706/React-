package todo

import (
	"log"
	"todo_app/service/controllers/todo/db"
	"todo_app/service/controllers/todo/jwt"

	"github.com/astaxie/beego"
)

const REQ_PARAMETERS_TOKEN = "token"
const REQ_PARAMETERS_USER_NAME = "username"
const REQ_PARAMETERS_USER_PWD = "pwd"

var todoListDB *db.TodoListDB
var jwtTool *jwt.JWT

const username = "123"
const pwd = "456"

var userToken string

type TodoListController struct {
	beego.Controller
}

func (this *TodoListController) Prepare() {
	log.Println("Prepare")

	this.InitDB()

	if this.Ctx.Request.URL.Path == "/todo-list/login" {
		if this.Ctx.Input.Query(REQ_PARAMETERS_USER_NAME) == "" || this.Ctx.Input.Query(REQ_PARAMETERS_USER_PWD) == "" {
			this.Ctx.Output.SetStatus(400)
			this.Data["json"] = "400 (Bad Request)"
			this.ServeJSON()
		}
		return
	} else if this.Ctx.Request.URL.Path == "/todo-list/logout" {
		if this.Ctx.Input.Query(REQ_PARAMETERS_TOKEN) == "" {
			this.Ctx.Output.SetStatus(400)
			this.Data["json"] = "400 (Bad Request)"
			this.ServeJSON()
		}
		return
	}

	authorized := false

	tokenStr := this.Ctx.Input.Query(REQ_PARAMETERS_TOKEN)
	if tokenStr != "" && userToken == tokenStr {
		username2, expires2, err := jwtTool.ValidatJWT(tokenStr)
		log.Println("username:", username2, ",  expires:", expires2, ",IsExpiredL", jwtTool.IsExpired(expires2), ", err:", err)
		if err != nil || expires2 <= 0 || username2 == "" || jwtTool.IsExpired(expires2) {
			authorized = true
		}
	}

	if !authorized {
		this.Ctx.Output.SetStatus(401)
		this.Data["json"] = "401 (Unauthorized)"
		this.ServeJSON()
	}
}

func (this *TodoListController) InitDB() {
	log.Println("InitDB")

	if todoListDB == nil {
		todoListDB = &db.TodoListDB{}
		// this.addTestCase()
	}

	if jwtTool == nil {
		jwtTool = &jwt.JWT{}
	}
}

// @router /todo-list/query [get]
func (this *TodoListController) Query() {
	log.Println("Query")

	err, str := todoListDB.Query()
	if err != nil {
		log.Println("fail Query, ", err)
		this.Ctx.Output.SetStatus(400)
		this.Data["json"] = "400 (Bad Request)"
		this.ServeJSON()
		return
	}
	log.Println("receive Query, response:", str)

	this.Data["json"] = str
	this.ServeJSON()
}

// @router /todo-list/repleaceAll [post]
func (this *TodoListController) RepleaceAll() {
	log.Println("RepleaceAll")

	jsoninfo := this.GetString("jsoninfo")
	log.Println("jsoninfo:", jsoninfo)

	err := todoListDB.RepleaceAll(jsoninfo)
	if err != nil {
		log.Println("fail RepleaceAll,", err)
		this.Ctx.Output.SetStatus(400)
		this.Data["json"] = "400 (Bad Request)"
		this.ServeJSON()
		return
	}

	err, str := todoListDB.Query()
	if err != nil {
		log.Println("fail Query, ", err)
		this.Ctx.Output.SetStatus(400)
		this.Data["json"] = "400 (Bad Request)"
		this.ServeJSON()
		return
	}
	log.Println("receive Query, response:", str)

	this.Data["json"] = str
	this.ServeJSON()
}

// @router /todo-list/login [post]
func (this *TodoListController) Login() {
	log.Println("Login")

	statusCode := 401
	var resp map[string]string
	resp = nil
	if this.Ctx.Input.Query(REQ_PARAMETERS_USER_NAME) == username && this.Ctx.Input.Query(REQ_PARAMETERS_USER_PWD) == pwd {
		token, err := jwtTool.CreateJWT(username)
		if err == nil && token != "" {
			statusCode = 200
			resp = make(map[string]string)
			resp[REQ_PARAMETERS_TOKEN] = token
			userToken = token
		} else {
			log.Println("fail Login, token:", token, ", err:", err)
		}
	}

	this.Ctx.Output.SetStatus(statusCode)

	if resp == nil {
		this.Data["json"] = "401 (Unauthorized)"
	} else {
		this.Data["json"] = resp
	}

	this.ServeJSON()
}

// @router /todo-list/logout [post]
func (this *TodoListController) Logout() {
	log.Println("Logout")

	tokenStr := this.Ctx.Input.Query(REQ_PARAMETERS_TOKEN)
	if tokenStr != "" && userToken == tokenStr {
		userToken = ""

		this.Data["json"] = "successful logout)"
	} else {
		this.Ctx.Output.SetStatus(400)
		this.Data["json"] = "400 (Bad Request)"
	}

	this.ServeJSON()
}

// func (this *TodoListController) addTestCase() { // TODO
// 	log.Println("addTestCase")

// 	var arr [5]db.TodoItem

// 	item := db.TodoItem{}
// 	item.Selected = false
// 	item.Text = "aaa"
// 	arr[0] = item

// 	item = db.TodoItem{}
// 	item.Selected = true
// 	item.Text = "bbb"
// 	arr[1] = item

// 	item = db.TodoItem{}
// 	item.Selected = false
// 	item.Text = "ccc"
// 	arr[2] = item

// 	item = db.TodoItem{}
// 	item.Selected = true
// 	item.Text = "ddd"
// 	arr[3] = item

// 	item = db.TodoItem{}
// 	item.Selected = false
// 	item.Text = "eee"
// 	arr[4] = item

// 	log.Println("json.Marshal arr,", arr)

// 	b, err := json.Marshal(arr)
// 	if err != nil {
// 		log.Println("json.Marshal err:", err)
// 		return
// 	}
// 	jsonStr := string(b)
// 	log.Println("json.Marshal b,", string(b))
// 	log.Println("json.Marshal jsonStr,", jsonStr)

// 	err = todoListDB.RepleaceAll(jsonStr)
// 	if err != nil {
// 		log.Println("fail addTestCase,", err)
// 	}
// }
