package db

import (
	"encoding/json"
	"log"
	"testing"
)

var db TodoListDB

func Test_init(t *testing.T) {
	log.Println("db.query()")

	query(t)
}

func Test_repleaceAll(t *testing.T) {
	log.Println("db.repleaceAll()")

	var jsonStr string

	var arr []TodoItem
	arr = append(arr, TodoItem{Selected: false, Text: "aaa"})
	arr = append(arr, TodoItem{Selected: true, Text: "bbb"})
	arr = append(arr, TodoItem{Selected: false, Text: "ccc"})

	b, _ := json.Marshal(arr)
	jsonStr = string(b)

	repleaceAll(t, jsonStr)

	str2 := query(t)
	if str2 != jsonStr {
		log.Println("query(t) != jsonStr, ", str2, jsonStr)
		t.Fail()
	}
}

func query(t *testing.T) string {
	log.Println("query")

	err, str := db.Query()
	if err != nil {
		t.Fail()
	}

	log.Println(str)

	return str
}

func repleaceAll(t *testing.T, jsonStr string) {
	log.Println("repleaceAll")

	err := db.RepleaceAll(jsonStr)
	if err != nil {
		t.Fail()
	}
}
