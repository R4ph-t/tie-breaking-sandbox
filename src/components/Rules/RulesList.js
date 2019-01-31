import React from "react";
import RuleElement from "./RuleElement";
import { SortableContainer } from "react-sortable-hoc";

class RulesListComp extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map((e, index) => (
          <RuleElement
            key={`item-${index}`}
            index={index}
            text={e}
            onSortEnd={this.onSortEnd}
          />
        ))}
      </div>
    );
  }
}

const RulesList = SortableContainer(RulesListComp);

export default RulesList;
