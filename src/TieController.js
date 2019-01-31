import React from "react";
import _ from "lodash";
import RulesContainer from "./components/Rules/RulesContainer";
import ResultsContainer from "./components/Results/ResultsContainer";
import rules from "./rules.json";
import legos from "./legos.json";
const resultCount = 9;

class TieController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [],
      resultCount,
      results: this.getNewSet(resultCount)
    };
  }
  getNewSet = count => {
    // TODO: at least one of each color
    const tmpResultArr = [];
    for (let i = 0; i < resultCount; i++) {
      tmpResultArr.push(legos[_.random(0, legos.length - 1)]);
    }
    //console.log(tmpResultArr);
    return tmpResultArr;
  };

  setNewSet = () => {
    this.setState({ results: this.getNewSet(resultCount) });
  };

  rulesUpdatedFromDrag = rules => {
    this.setState({ rules }, () => {
      this.updateResults(rules);
    });
  };

  updateRules = rules => {
    this.setState({ rules });
  };

  resultsUpdatedFromDrag = results => {
    this.setState({ results });
  };

  updateResults = newRules => {
    newRules.forEach(rule => this.applySortingForRule(rule));
  };

  applySortingForRule = rule => {
    let currentSorting = this.state.results;

    let newSorting = [];
    for (const res of currentSorting) {
      //console.log(res);
    }
  };

  render() {
    // console.log(rules);
    const resultsToshow = this.state.results || [];
    return (
      <div>
        <div className="main-container">
          <RulesContainer
            rules={rules}
            updateRules={this.updateRules}
            rulesUpdatedFromDrag={this.rulesUpdatedFromDrag}
            isDraggable={true}
          />
          <ResultsContainer
            results={resultsToshow}
            updateResults={this.updateResults}
            resultsUpdatedFromDrag={e => this.resultsUpdatedFromDrag(e)}
            isDraggable={true}
          />
        </div>
        <div>
          <button onClick={this.setNewSet}>NewSet</button>
        </div>
      </div>
    );
  }
}

export default TieController;
