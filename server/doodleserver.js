const path = require('path');

var Database = require("../model/database.js");

/* https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen */
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const startPort = 8888;

let clientID = 0; // these are unique ids that the server gives to clients

// key is room name/id
// 'theRoom' : [{color: '#BADDA55', coords:[x,y,x,y,...] }]
// the value is basically an array of the history of the strokes
// Currently we only have one Room so we'll call it 'theRoom'
let doodRoomsData = {};

// have this so that I can serve up static files like .css, .js, etc.
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("./"));

app.get('/', (req, res, next) => {
  res.status(200);
  res.sendFile(path.join( __dirname, '..', "/index.html"));
} )

// app.get('/gallery', (req, res, next) => {

// })

// app.post('/save', (req, res, next) => {

// })


server.listen(startPort, () => {
  console.log("starting server on port:", startPort);
});




/**
 * Socket stuff here
 */

// console.log('io: ', io);
io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('a user disconnected');
  });

  socket.on("doodClientMessage", function(data) {
    msg = JSON.parse(msg);
    console.log('message: ' + msg);
  });



  /** 
   *  
   * listen for drawing coordinates from client
  */

  // this message is for real time point by point
  socket.on("doodCoords", function(data) { 
    // broadcast to all except for the sender
    socket.broadcast.emit("broadcastCoords", data);
  });

  // this is real time stroke by stroke
  socket.on("doodStroke", function (data) {
    // broadcast to all except for the sender
    socket.broadcast.emit("broadcastStroke", data);

    // also save it to memory
    // first check to see if we have a key already
    if (!doodRoomsData.hasOwnProperty("theRoom")) {
      doodRoomsData["theRoom"] = [];
    }
    doodRoomsData['theRoom'].push(data);
    // console.log(doodRoomsData);
  });



});





