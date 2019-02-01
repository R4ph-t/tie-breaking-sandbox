import React from "react";
import { SortableElement } from "react-sortable-hoc";

class RulesElementComp extends React.Component {
  state = {};

  formatOrdering = () => {
    let ordering = "";
    if (this.props.sorting[0] === -1) {
      ordering = "ascending";
    } else if (this.props.sorting[0] === 1) {
      ordering = "descending";
    } else {
      for (let attr of this.props.sorting) {
        ordering += `${attr} > `;
      }
      ordering = ordering.substring(0, ordering.length - 3);
    }
    return ordering;
  };

  updateSortingOrder = () => {
    console.log(this.props);

    this.props.updateSortingOrder({
      attribute: this.props.attribute,
      isAsc: !this.props.isAsc
    });
  };

  render() {
    return (
      <div className="rule-element">
        <h4>{this.props.attribute}</h4>
        <div>
          <button onClick={this.updateSortingOrder}>
            {this.formatOrdering()}>
          </button>
        </div>
      </div>
    );
  }
}

const RulesElement = SortableElement(RulesElementComp);

export default RulesElement;
