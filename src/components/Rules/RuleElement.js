import React from "react";
import { SortableElement } from "react-sortable-hoc";

const RulesElementComp = props => {
  let ordering = "";
  if (props.sorting[0] === -1) {
    ordering = "ascending";
  } else if (props.sorting[0] === 1) {
    ordering = "descending";
  } else {
    for (let attr of props.sorting) {
      ordering += `${attr} > `;
    }
    ordering = ordering.substring(0, ordering.length - 3);
  }

  return (
    <div className="rule-element">
      <h4>{props.attribute}</h4>
      <p>{ordering}</p>
    </div>
  );
};

/*



<div className="rule-element">
  <h4>{props.attribute}</h4>
  <p></p>
</div>

*/

const RulesElement = SortableElement(RulesElementComp);

export default RulesElement;
