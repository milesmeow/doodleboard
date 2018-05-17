import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";


let saveDrawing = function () {
  console.log('saveDrawing called');
  socket.emit("doodSave", socket.id);
}

let changeColor = function () {
  console.log('changeColor is called')
}

render(<App saveDrawing={saveDrawing} changeColor={changeColor} />, document.getElementById('app-root'));
