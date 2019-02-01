import React from "react";
import ReactDOM from "react-dom";
import TieController from "./TieController";

import "./styles/index.scss";

function App() {
  return (
    <div>
      <h1>Tie-Breaking Sandbox</h1>
      <TieController />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
