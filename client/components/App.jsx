import React, { Component } from 'react';
import { render } from "react-dom";
import Controls from './Controls.jsx';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.store = { drawingURL: '' };  //Not going to use this

    this.handleSave = this.handleSave.bind(this);
  }

  /**
   *
   * @param {This is from the Save button} event
   */
  handleSave(event) {
    console.log("Save Button is pressed...emitting message from client: ", socket.id);

    this.props.saveDrawing();
    // socket.emit('doodSave', socket.id);
    // we want to send a POST request to the server so that 
    // it notifies them to save the current session and current canvas data to the database
    
    // Need to pass this down to the Control so we can show it in the text message
    // I'm doing this before the data has been saved...TODO:: need to do it after it has been saved.
    // Maybe even show a loading icon.
    this.store.drawingURL = "localhost:8888/gallery/socket.id";
    this.updateState(this.store);
  }

  
  render() {
    return (
    <div id="container">
      <div id="canvas-container">
        <canvas id="draw" width="600" height="600"></canvas>
      </div>
      <Controls handleSave={this.handleSave} />
    </div>
    );
  }
}


export default App;