import React from "react";
import { SortableElement } from "react-sortable-hoc";

const ResultElementComp = props => {
  const { img, position } = { ...props };
  return (
    <div className="result-element">
      <span className="position">{position}</span>
      <img className="lego" src={`assets/bricks/${img}`} alt="" />
    </div>
  );
};

const ResultElement = SortableElement(ResultElementComp);

export default ResultElement;
