package jwt

import (
	"errors"
	"fmt"
	"log"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

const tag_username = "username"
const tag_expires = "expires"

type JWT struct {
	hmacSampleSecret []byte
	defExpires       int64
}

func (this *JWT) Init(secret string, expires int64) {
	this.hmacSampleSecret = []byte(secret)
	this.defExpires = expires
}

func (this *JWT) createExpires(sec int64) int64 {
	return time.Now().Add(time.Second * time.Duration(sec)).Unix()
}

func (this *JWT) IsExpired(t int64) bool {
	return time.Now().Unix()-t >= 0
}

func (this *JWT) CreateJWT(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		tag_username: username,
		tag_expires:  this.createExpires(this.defExpires),
	})

	tokenString, err := token.SignedString(this.hmacSampleSecret)

	fmt.Println(tokenString, err)
	return tokenString, err
}

func (this *JWT) ValidatJWT(tokenString string) (string, int64, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return this.hmacSampleSecret, nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// log.Println("success parse,")

		var username string
		var expires int64

		username = ""
		expires = -1

		if claims[tag_username] != nil {
			value, ok := claims[tag_username].(string)
			if ok {
				username = value
			}
		}

		if claims[tag_expires] != nil {
			value, ok := claims[tag_expires].(float64)
			// log.Println(tag_expires, ":", expires, ", ok:", ok)
			if ok {
				expires = int64(value)
			}
		}

		var err error
		if username == "" {
			err = errors.New("username empty")
		} else if expires <= 0 {
			err = errors.New("username expires <= 0")
		}

		return username, expires, err
	} else {
		log.Println("fail parse,", err)
		return "", -1, err
	}
}
