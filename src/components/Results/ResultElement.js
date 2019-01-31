import React from "react";
import { SortableElement } from "react-sortable-hoc";

export const ResultElementComp = props => {
  const { img } = { ...props };
  return (
    <div className="result-element">
      <img className="lego" src={`assets/bricks/${img}`} />
    </div>
  );
};

const ResultElement = SortableElement(ResultElementComp);

export default ResultElement;
//
