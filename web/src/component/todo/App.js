import React, { Component } from 'react';
import Todo from './Todo';

class App extends Component {
  render() {
    return (
      <div>
        <Todo token={this.props.token} />
      </div>
    );
  }
}

export default App;
