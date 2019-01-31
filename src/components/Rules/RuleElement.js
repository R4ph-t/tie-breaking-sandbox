import React from "react";
import { SortableElement } from "react-sortable-hoc";

// props: description, attribut, ordering

export const RulesElementComp = props => {
  return <div className="rule-element">{props.attribute}</div>;
};

const RulesElement = SortableElement(RulesElementComp);

export default RulesElement;
