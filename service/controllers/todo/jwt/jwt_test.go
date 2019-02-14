package jwt

import (
	"log"
	"testing"
	"time"
)

func Test_jwt(t *testing.T) {
	secret := "sdfsdfsdfsd"
	expires := 5

	obj := JWT{}
	obj.Init(secret, int64(expires))

	username := "ABC"
	token, err := obj.CreateJWT(username)
	if err != nil {
		t.Log("CreateJWT, err", err)
		t.Fail()
	}
	// t.Log("token:", token)

	if token == "" {
		t.Log("CreateJWT, token empty")
		t.Fail()
	}

	for i := 0; i < 7; i++ {
		username2, expires2, err := obj.ValidatJWT(token)

		if err != nil {
			t.Log("loop err, ", err)
			t.Fail()
		}

		if username2 != username {
			t.Log("error username, ", username2)
			t.Fail()
		}

		if expires2 <= 0 {
			t.Log("error expires, ", expires2)
			t.Fail()
		}

		expired := obj.IsExpired(expires2)

		log.Println("IsExpired, ", expired)

		time.Sleep(1 * time.Second)
	}
}
