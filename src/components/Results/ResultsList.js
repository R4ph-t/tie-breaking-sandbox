import React from "react";
import ResultElement from "./ResultElement";
import { SortableContainer } from "react-sortable-hoc";

class ResultsListComp extends React.Component {
  render() {
    return (
      <div className="results-container">
        <ResultElement />
        <ResultElement />
      </div>
    );
  }
}

const ResultsList = SortableContainer(ResultsListComp);

export default ResultsList;
