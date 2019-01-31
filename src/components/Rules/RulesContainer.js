import React from "react";
import RulesList from "./RulesList";
import { arrayMove } from "react-sortable-hoc";

import "../../styles/rules.scss";

class RulesContainer extends React.Component {
  state = {
    items: ["Rule 1", "Rule 2", "Rule 3", "Rule 4", "Rule 5", "Rule 6"]
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
    this.props.updateRules(this.state.items);
  };

  render() {
    return (
      <div className="rules-container">
        <RulesList items={this.state.items} onSortEnd={this.onSortEnd} />
      </div>
    );
  }
}

export default RulesContainer;
