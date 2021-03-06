import React from "react";
import RulesList from "./RulesList";
import { arrayMove } from "react-sortable-hoc";
import "../../styles/rules.scss";

class RulesContainer extends React.Component {
  state = {
    items: this.props.rules
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      { items: arrayMove(this.state.items, oldIndex, newIndex) },
      () => {
        this.props.rulesUpdatedFromDrag(this.state.items);
      }
    );
  };

  updateSortingOrder = ruleToUpdate => {
    this.props.updateSortingOrder(ruleToUpdate);
  };

  shouldCancel = () => {
    return !this.props.isDraggable;
  };

  render() {
    return (
      <div className="rules-container">
        <RulesList
          items={this.state.items}
          shouldCancelStart={this.shouldCancel}
          onSortEnd={this.onSortEnd}
          distance={2}
          updateSortingOrder={this.updateSortingOrder}
        />
      </div>
    );
  }
}

export default RulesContainer;
