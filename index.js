"use strict"

const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()

let token = 'EAANQOPly8IgBACVjjtKGHWv01XVnPSbZCzXs673ZCdQwWZCyzB8fzu4Xt4kzfhYebz3eFiDteGtJrNrsZBRjaoouOXZAufudrZAQR38N7YOIFjk1MwtCKZCjthZBGkd90a7qMLp7KdVUqZAxvvf4BRxNYnioGDZCgphgdLkjClDYVjnAZDZD'

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

// Post
app.post('/webhook/', function(req,res){
  let messaging_events = req.body.entry[0].messaging_events
  for(let i=0; i < messaging_events.length; i++){
    let event = req.body.entry[0].messaging[i]
   let sender = event.sender.id
   if (event.message && event.message.text) {
     let text = event.message.text
     sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
   }
 }
 res.sendStatus(200)
  }
)

function sendText(sender,text){
  let messageData = {text: text}
  request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })

}
// Validating port is running.
app.listen(app.get('port'), function(){
  console.log("Running: port")
})
