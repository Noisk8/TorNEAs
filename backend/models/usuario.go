package models

import (
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

type Usuario struct {
	gorm.Model
	Email        string `gorm:"unique;not null"`
	Password     string `gorm:"not null"`
	Nombre       string `gorm:"not null"`
	Rol          string `gorm:"not null;default:'admin'"` // admin, editor
	Activo       bool   `gorm:"not null;default:true"`
}

func (u *Usuario) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *Usuario) CheckPassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
}
