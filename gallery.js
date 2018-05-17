let socket = io.connect("http://localhost:8888");

let mySocketID;
const select_list_prompt = "Choose a Drawing";
let drawingsData;

socket.on("connect", () => {
  mySocketID = socket.id; // this is a unique ID...the server also receives this
  // console.log(socket.id);

  // ask for data...pass a callback
  socket.emit('getAllDrawings', (response) => {
    // console.log("My callback I got something back from the server...", response);

    if (response !== "ERR") {
      drawingsData = response; //save it for other functions
      //now create buttons or links dynamically
      const select = document.getElementById("selectDrawing");
      
      // Optional: Clear all existing options first:
      select.innerHTML = select_list_prompt;
      // Populate list with options:
      for (var i = 0; i < response.length; i++) {
        select.innerHTML += "<option value=\"" + i + "\">Drawing " + i + "</option>";
      }
    }


  })

});

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

// ctx.strokeStyle = color;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

function drawStroke (data) {
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
}

// document.addEventListener("DOMContentLoaded", function (event) {
//   // Do mongo DB call
//   Mongoose.getAllDrawings()
//     .then((docs) => {
//       console.log('doodleserver mongoose db ok: result: ', docs);
//     })
//     .catch((error) => {
//       console.error('doodleserver mongoose db: ', error);
//     })

// });


function displayDrawing() {
    var x = document.getElementById("selectDrawing").value;
    // console.log('Drawing is selected:', x);
    if ( x !== select_list_prompt) {
      // clear it
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      //now Draw!
      let d = drawingsData[x].data;
      for(i=0; i<d.length; i++){
        drawStroke(d[i]);
      }
    }
}



