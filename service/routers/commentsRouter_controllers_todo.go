package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

    beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"] = append(beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"],
        beego.ControllerComments{
            Method: "Login",
            Router: `/todo-list/login`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"] = append(beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"],
        beego.ControllerComments{
            Method: "Logout",
            Router: `/todo-list/logout`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"] = append(beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"],
        beego.ControllerComments{
            Method: "Query",
            Router: `/todo-list/query`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"] = append(beego.GlobalControllerRouter["todo_app/service/controllers/todo:TodoListController"],
        beego.ControllerComments{
            Method: "RepleaceAll",
            Router: `/todo-list/repleaceAll`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

}
