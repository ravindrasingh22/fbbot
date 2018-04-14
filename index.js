"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()

app.set("port", (process.env.PORT || 5000))

// Allow us to process the data

app.use(bodyParser.urlencoded({exntended: false}))

app.use(bodyParser.json())

// Routes
app.get('/', function(req,res){
  res.send("Hi, I am bot")
})

// Facebook

app.get('/webhook/', function(req,res){
  if(req.query['hub.verify_token'] == "tundriyalpagebot"){
    res.send(req.query['hub.challenge'])
  }
})

// Validating port is running.
app.listen(app.get('port'), function(){
  console.log("Running: port")
})
