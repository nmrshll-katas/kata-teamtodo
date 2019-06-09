import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./styles/css/tailwind.css";
import { TasksStore, DatabaseProvider } from "./data/state/taskDB";

import App from "./components/pages/App";

ReactDOM.render(
  <TasksStore.Provider>
    <App />
  </TasksStore.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
