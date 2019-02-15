package db

import (
	"encoding/json"
	"log"
	"sync"
)

type TodoListDB struct {
	todoList []TodoItem
	lock     sync.Mutex
}

type TodoItem struct {
	Selected bool
	Text     string
	Content  string
}

func (this *TodoListDB) RepleaceAll(jsonStr string) error {
	this.lock.Lock()
	defer this.lock.Unlock()

	var arr []TodoItem
	err := json.Unmarshal([]byte(jsonStr), &arr)
	if err != nil {
		log.Println("Cannot Unmarshal json", err)
		return err
	}

	this.todoList = arr

	log.Println("success, encode JSON", jsonStr)

	return nil
}

func (this *TodoListDB) Query() (error, string) {
	this.lock.Lock()
	defer this.lock.Unlock()

	todoListJson, err := json.Marshal(this.todoList)
	if err != nil {
		log.Println("Cannot encode json", err)
		return err, ""
	}

	log.Println("success, encode JSON", todoListJson)

	return nil, string(todoListJson[:])
}
