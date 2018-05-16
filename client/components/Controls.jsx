import React from 'react';
// import AddTodo from '../containers/AddTodo'
// import VisibleTodoList from '../containers/VisibleTodoList'

const Controls = (props) => (
  <div id="controls">
    <h2>Tools</h2>
    <button type="button" onClick={props.handleSave}>Save Drawing</button>
  </div>
)

export default Controls;