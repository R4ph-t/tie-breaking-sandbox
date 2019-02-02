import React from "react";
import ReactDOM from "react-dom";
import TieController from "./TieController";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faPlusCircle,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import "./styles/index.scss";

function App() {
  library.add(faCheckSquare, faPlusCircle, faChevronCircleRight);

  return (
    <div>
      <h1>Tie-Breaking Sandbox</h1>
      <TieController />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
