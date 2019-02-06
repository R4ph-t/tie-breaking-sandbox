import React from "react";
import { SortableElement } from "react-sortable-hoc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RulesElementComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAsc: props.isAsc
    };
  }

  formatOrdering = () => {
    console.log(this.props.isAsc);
    console.log(this.state.isAsc);

    const sorting = this.props.sorting[this.props.isAsc ? "asc" : "desc"];
    
    return sorting.map((attr, index) => 
        <span key={`sort-attr-${index}`}>
          {attr}{" "} 
          {index < sorting.length - 1 && (
            <FontAwesomeIcon icon="chevron-circle-right" />
          )}
          {" "}
        </span>
      );
  };

  updateSortingOrder = () => {
    this.setState(
      () => ({ isAsc: !this.props.isAsc }),
      () => {
        this.props.updateSortingOrder({
          attribute: this.props.attribute,
          isAsc: this.state.isAsc
        });
      }
    );
  };

  render() {
    return (
      <div className="rule-element">
        <div className="rule-title">
          <h4>{this.props.attribute}</h4>
        </div>
        <div className="rule-sorting-btn-container">
          <button
            className="button-default rule-sorting-btn"
            onClick={this.updateSortingOrder}
          >
            {this.formatOrdering()}
          </button>
        </div>
      </div>
    );
  }
}

const RulesElement = SortableElement(RulesElementComp);

export default RulesElement;
