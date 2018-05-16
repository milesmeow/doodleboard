const path = require("path");

/* https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen */
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const startPort = 8888;

let clientID = 0; // these are unique ids that the server gives to clients
// let clientColors = [];

// have this so that I can serve up static files like .css, .js, etc.
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("./"));

app.get('/', (req, res, next) => {
  res.status(200);
  res.sendFile(path.join( __dirname, '..', "/index.html"));
} )

// app.get('/gallery', (req, res, next) => {

// })




server.listen(startPort, () => {
  console.log("starting server on port:", startPort);
});


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

  // listen for drawing coordinates from client
  socket.on("doodCoords", function(data) { 
    // broadcast to all except for the sender
    socket.broadcast.emit("broadcastCoords", data);
  });



});




