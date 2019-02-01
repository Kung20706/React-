import React, { Component } from 'react';
import Todo from './Todo';
import AddNewTask from './AddNewTask';


class App extends Component {
  render() {
    return (
      <div>
        <AddNewTask />
        <Todo />
      </div>
    );
  }
}

export default App;
