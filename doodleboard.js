let socket = io.connect("http://localhost:8888");

let mySocketID;

socket.on('connect', () => {
  mySocketID = socket.id; // this is a unique ID...the server also receives this
  console.log(socket.id);
});

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


socket.on("broadcastStroke", function (data) {
  ctx.strokeStyle = data.color;
  
  let lX;
  let lY;
  let cX;
  let cY;
  
  // console.log('received data', data);
  // coords is [x,y,x,y,x,y,x,y,...].  assuming we have an even number of pairs of x,y.
  for (let i=0; i<data.coords.length-4; i=i+2){ 
    lX = i;
    lY = i+1;
    cX = i+2;
    cY = i+3;
    ctx.beginPath();
    ctx.moveTo(data.coords[lX], data.coords[lY]);
    ctx.lineTo(data.coords[cX], data.coords[cY]);
    ctx.stroke();
  }
});


//for now it's random
const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// for saving points of the stroke
let currentStroke = [];


ctx.strokeStyle = color;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let isDrawing = false;

// for drawing lines
let lastX = 0;
let lastY = 0;


function draw(e) {
  if (!isDrawing) return;
  ctx.strokeStyle = color; //reset this context b/c when we receive other people's strokes we overwrite this
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  
  // ctx.globalCompositeOperator = 'multiply';
  // console.log(socket.id);
  // socket.emit("doodCoords", { lX: lastX, lY: lastY, cX : e.offsetX, cY : e.offsetY });
  
  // save to our currentStroke...convention is x then y...so no need to keep it nice an tidy in an object
  currentStroke.push(e.offsetX, e.offsetY); 
  
  [lastX, lastY] = [e.offsetX, e.offsetY];
  
}

function sendStroke(e) {
    // sent data over socket...if necessary
    if (currentStroke.length > 0) {
      let data = { color: color, coords: currentStroke };
      // console.log("received data", data);
      socket.emit("doodStroke", data);
      currentStroke = [];
    }
    isDrawing = false;
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  currentStroke.push(e.offsetX, e.offsetY); 
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener("mouseup", sendStroke);
canvas.addEventListener('mouseout', sendStroke);