import React, { Component } from 'react';
import { render } from "react-dom";
import Controls from './Controls.jsx';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSave = this.handleSave.bind(this);
  }

  /**
   *
   * @param {This is from the Save button} event
   */
  handleSave(event) {
    console.log("Save Button is pressed");
  }

  render() {
    return (
      <div>
        <h3>doodleboard alpha</h3>
        <canvas id="draw" width="600" height="600" />
        <Controls handleSave={this.handleSave} />
      </div>
    );
  }
}


export default App;