import React from "react";
import RuleElement from "./RuleElement";
import { SortableContainer } from "react-sortable-hoc";

class RulesListComp extends React.Component {
  render() {
    console.log(this.props.items);
    return (
      <div>
        {this.props.items.map((item, index) => (
          <RuleElement
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

const RulesList = SortableContainer(RulesListComp);

export default RulesList;
