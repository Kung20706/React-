import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
