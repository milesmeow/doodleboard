let socket = io.connect("http://localhost:8888");


socket.on("doodMessageFromServer", function(data) {
  socket.emit("doodClientMessage", { state: "hello from client" });
});


// someone is sending me coords to draw
socket.on("broadcastCoords", function(data) {
  ctx.beginPath();
  ctx.moveTo(data.lX, data.lY);
  ctx.lineTo(data.cX, data.cY);
  ctx.stroke();
});




const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;

// for drawing lines
let lastX = 0;
let lastY = 0;

// for saving points of the stroke
let currentStroke = [];

function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  // ctx.globalCompositeOperator = 'multiply';
  // console.log(socket.id);
  socket.emit("doodCoords", { lX: lastX, lY: lastY, cX : e.offsetX, cY : e.offsetY });
  
  [lastX, lastY] = [e.offsetX, e.offsetY];

}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', (e) => {
  isDrawing = false;
});
canvas.addEventListener('mouseout', () => isDrawing = false);