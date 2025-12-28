package cron

import (
	"log"
	"sync"
	"time"

	"example.com/go-echo-crud/internal/service"
	"github.com/robfig/cron/v3"
)

var once sync.Once

func Start(todoService service.ITodosService) {
	once.Do(func() {
		loc, err := time.LoadLocation("Asia/Tokyo")
		if err != nil {
			log.Println("timezone load error:", err)
			return
		}

		c := cron.New(cron.WithLocation(loc))

		log.Println("cron started: daily reset 00:00 JST")

		_, err = c.AddFunc("0 0 * * *", func() {
			if err := todoService.ResetTodos(); err != nil {
				log.Println("cron reset error:", err)
			}
		})
		if err != nil {
			log.Println("cron addfunc error:", err)
			return
		}

		c.Start()
	})
}
