const express = require('express')
var bodyParser = require('body-parser')
const { ResponseService } = require('./service/ResponseServices')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const cors = require('cors'); // Import the cors package
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/test", (req, res) => {
  res.json({message: 'Success'})
})

app.post("/webhook", async (req, res) => {
    let body = req.body;
    if (body.object === "page") {
      try {
        const responseService = new ResponseService()
        await responseService.handleReceivedMessage(body)   
        res.status(200).send("EVENT_RECEIVED");
      } catch(err) {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
})

app.get("/webhook", (req, res) => {

  // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
      // Check the mode and token sent is correct
      if (mode === "subscribe" && token === 'token') {
        // Respond with the challenge token from the request
         console.dir("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Respond with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  })

app.listen(3000)