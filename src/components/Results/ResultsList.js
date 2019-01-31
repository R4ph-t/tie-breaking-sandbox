import React from "react";
import ResultElement from "./ResultElement";
import { SortableContainer } from "react-sortable-hoc";

class ResultsListComp extends React.Component {
  render() {
    return (
      <div className="results-container">
        {this.props.items.map((item, index) => (
          <ResultElement
            key={`item-${index}`}
            index={index}
            {...item}
            onSortEnd={this.onSortEnd}
          />
        ))}
      </div>
    );
  }
}

const ResultsList = SortableContainer(ResultsListComp);

export default ResultsList;
