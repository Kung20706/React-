import React, { Component } from 'react';
import SignInApp from './signIn/App';
import TodoApp from './todo/App';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { token: state.updateToken.token };
};

class App extends Component {
  render() {
    const { token } = this.props

    console.log('console token:'+token);

    if(undefined === token || token.length <= 0){
      return (
        <div>
          <SignInApp />
        </div>
      );
    }

    return (
      <div>
        <TodoApp />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
