import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import Layout from "./components/Layout";
import createStore from "./store";
import "./App.css";

const store = createStore(window.REDUX_DATA);
console.log("process.env.NODE_ENV===", window);

const jsx = (
  <ReduxProvider store={store}>
    <Router>
      <Layout />
    </Router>
  </ReduxProvider>
);

const app = document.getElementById("app");
ReactDOM.hydrate(jsx, app);
