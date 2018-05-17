import React, { Component } from "react";
import { render } from "react-dom";

class Controls extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    // let colors = []
    // for(let i=0; i<10; i++){
    //   colors.push(
    //     `<div class="color-option" id="color-${i}" onClick=${this.props.handleColorChoice}></div>`
    //   )
    // }

    // <div id="current-color"></div>
    //   <div id="color-palette">
    //     {colors}
    //   </div>

    return (<div id="controls">
        <h2>doodleboard alpha</h2>
        <textarea id="status-text" rows="5" cols="50" defaultValue="You'll see status messages from the server here..." />
        <div>
          <button id="save-btn" type="button" onClick={this.props.handleSave}>
            Save Drawing
          </button>
        </div>
      </div>);
  }
}



// const Controls = (props) => (
//   <div id='controls'>
//     <h2>doodleboard alpha</h2>
//     <h3>Tools</h3>
//     <textarea id="status-text" rows="5" cols="50">
//       You'll see status messages from the server here...
//     </textarea> 
//     <button type="button" onClick={props.handleSave}>Save Drawing</button>
//   </div>
// )


export default Controls;