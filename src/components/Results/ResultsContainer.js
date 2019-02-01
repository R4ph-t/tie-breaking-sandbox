import React from "react";
import ResultElement from "./ResultElement";
import ResultsList from "./ResultsList";
import { arrayMove } from "react-sortable-hoc";

import "../../styles/results.scss";

class ResultContainer extends React.Component {
  state = {
    items: this.props.results
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ items }) => ({
        items: arrayMove(items, oldIndex, newIndex)
      }),
      () => {
        this.props.resultsUpdatedFromDrag(this.state.items);
      }
    );
  };

  shouldCancel = () => {
    return !this.props.isDraggable;
  };

  render() {
    const resultsToshow = this.state.items || [];
    return (
      <ResultsList
        items={this.props.results}
        onSortEnd={this.onSortEnd}
        shouldCancelStart={this.shouldCancel}
      />
    );
  }
}

export default ResultContainer;
