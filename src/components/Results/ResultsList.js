import React from "react";
import ResultElement from "./ResultElement";
import { SortableContainer } from "react-sortable-hoc";

const ResultsListComp = props => {
  return (
    <div className="results-container">
      {props.items.map((item, index) => (
        <ResultElement
          key={`item-${index}`}
          index={index}
          position={index + 1}
          {...item}
        />
      ))}
    </div>
  );
}

const ResultsList = SortableContainer(ResultsListComp);

export default ResultsList;
