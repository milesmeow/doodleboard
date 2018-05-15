const path = require("path");

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const startPort = 8888;
// have this so that I can serve up static files like .css, .js, etc.
app.use(express.static("./"));

app.get('/', (req,res) => {
  res.status(200);
  res.sendFile(path.join( __dirname, '..', "/index.html"));
} )


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
    // console.log(msg);
    //   messageController.sendSocketMessage(msg);
  });
});





