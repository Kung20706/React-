import React, { Component } from 'react';
import SignInApp from './signIn/App';
import TodoApp from './todo/App';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { articles: state.rootReducer.articles };
};

class App extends Component {
  render() {
    const { articles } = this.props

    console.log('console articles:'+articles.email);

    return (
      <div>
        <SignInApp />
        <TodoApp />
      </div>
    );
  }
}

// export default App;

export default connect(mapStateToProps)(App);
