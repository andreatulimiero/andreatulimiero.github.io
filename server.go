package main

import (
  "fmt";
  "log";
  "net/http";
)

func main(){
  fmt.Println("Serving on port 8000")
  http.Handle("/", http.FileServer(http.Dir('.')))
  err := http.ListenAndServe(":8000", nil)
  if err != nil {
    log.Fatal("ListenAndServe: ", err)
  }
}