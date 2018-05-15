const express = require("express");
const app = express();

const startPort = 8888;

app.use('/', (req,res) => {
  res.status(200);
  res.end("hello world");
} )

console.log('starting server on port:', startPort);
app.listen(startPort);
