import React, { Component } from "react";
import { render } from "react-dom";

class Controls extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <div id='controls'>
        <h2>doodleboard alpha</h2>
        <textarea id="status-text" rows="5" cols="50">
          You'll see status messages from the server here...
        </textarea>
        <div><button type="button" onClick={this.props.handleSave}>Save Drawing</button></div>
      </div>
    );
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