import React from "react";
import _ from "lodash";
import RulesContainer from "./components/Rules/RulesContainer";
import ResultsContainer from "./components/Results/ResultsContainer";
import rules from "./rules.json";
import legos from "./legos.json";

const resultCount = 9;
const attributeMapping = {
  color: {
    red: 0,
    blue: 1,
    white: 2
  },
  shape: {
    rect: 0,
    round: 1
  }
};

const rulesQueue = [];

class TieController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: rules.lego,
      resultCount,
      results: this.getNewSet(resultCount)
    };
  }

  buildAHit = data => {
    //map readable attributes to ints
    const newObj = Object.assign({}, data);
    Object.keys(attributeMapping).forEach(key => {
      newObj[key] = attributeMapping[key][data[key]];
    });
    return newObj;
  };

  getNewSet = count => {
    // TODO: at least one of each color
    const tmpResultArr = [];
    for (let i = 0; i < resultCount; i++) {
      const randLegoIdx = _.random(0, legos.length - 1);
      const hitData = legos[randLegoIdx];
      tmpResultArr.push(this.buildAHit(hitData));
    }
    return tmpResultArr;
  };

  setNewSet = () => {
    this.setState({ results: this.getNewSet(resultCount) });
  };

  // rules ordered modified by user
  rulesUpdatedFromDrag = newRules => {
    console.log("rules updated from drag");
    console.log(this.state.rules[0]);
    console.log(newRules[0]);
    /*this.setState({ rules: rules }, () => {
      // this.updateResults(rules);
      console.log(this.state.rules[0]);
    });*/
    this.setState(
      state => ({
        rules: newRules
      }),
      () => {
        console.log(this.state.rules[0]);
        this.updateResults(this.state.rules);
      }
    );
  };

  updateRules = rules => {
    this.setState({ rules });
  };

  // in game mode result order modified by player
  resultsUpdatedFromDrag = results => {
    console.log(this.state.results[0]);
    console.log(results[0]);
    this.setState({ results: results }, () => {
      //console.log(this.state.results[0]);
    });
  };

  // update results after Rule changed
  updateResults = newRules => {
    this.applySortingForRule(newRules[0]);
    //_.reverse(newRules).forEach(rule => this.applySortingForRule(rule));
  };

  // sort by one rule
  applySortingForRule = rule => {
    let currentResultsSorting = this.state.results;
    // console.log(rule);
    //this is only ascending
    const newSorting = currentResultsSorting.sort((a, b) => {
      return a[rule.attribute] - b[rule.attribute];
    });
    //console.log(newSorting);
    this.setState(state => ({
      results: newSorting
    }));
  };

  render() {
    // console.log(rules);
    const resultsToshow = this.state.results || [];
    const rulesToshow = this.state.rules || [];

    return (
      <div>
        <div className="main-container">
          <RulesContainer
            rules={rulesToshow}
            updateRules={this.updateRules}
            rulesUpdatedFromDrag={e => this.rulesUpdatedFromDrag(e)}
            isDraggable={true}
          />
          <ResultsContainer
            results={resultsToshow}
            updateResults={this.updateResults}
            resultsUpdatedFromDrag={e => this.resultsUpdatedFromDrag(e)}
            isDraggable={false}
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
