import React from "react";
import ReactDOM from "react-dom";
import App from "./react-redux/App";
import store from "./react-redux/Store";
import { Provider } from 'react-redux'

import registerServiceWorker from "./react-redux/registerServiceWorker";


/*
ref:
https://github.com/xnng/react-redux-practice/tree/master/react-redux
*/


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
