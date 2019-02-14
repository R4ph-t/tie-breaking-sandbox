import React from "react";
import RuleElement from "./RuleElement";
import { SortableContainer } from "react-sortable-hoc";

class RulesListComp extends React.Component {
  updateSortingOrder = ruleToUpdate => {
    this.props.updateSortingOrder(ruleToUpdate);
  };

  render() {
    return (
      <div>
        {this.props.items.map((item, index) => (
          <RuleElement
            key={`item-${index}`}
            index={index}
            {...item}
            onSortEnd={this.onSortEnd}
            updateSortingOrder={this.updateSortingOrder}
          />
        ))}
      </div>
    );
  }
}

const RulesList = SortableContainer(RulesListComp);

export default RulesList;
