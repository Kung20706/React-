import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";

// ref: 
// http://www.superbug.me/2018/02/06/react-redux-tutorial-for-beginners-learning-redux-in-2018/
// http://taobaofed.org/blog/2016/08/18/react-redux-connect/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);