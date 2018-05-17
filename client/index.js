import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";


let saveDrawing = function () {
  console.log('saveDrawing called');
  socket.emit("doodSave", socket.id);
}

render(<App saveDrawing={saveDrawing}/>, document.getElementById('app-root'));
