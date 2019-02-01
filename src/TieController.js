import React from "react";
import _ from "lodash";
import RulesContainer from "./components/Rules/RulesContainer";
import ResultsContainer from "./components/Results/ResultsContainer";
import config from "./config.json";

const resultCount = 9;
let rulesQueue = [];
const configLegos = config.lego;
const legos = configLegos.dataset;

class TieController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: configLegos.criterias,
      resultCount,
      results: this.getNewSet(resultCount)
    };
  }

  buildAHit = data => {
    //map readable attributes to ints
    const newObj = Object.assign({}, data);
    Object.keys(configLegos.attributeMapping).forEach(key => {
      newObj[key] = configLegos.attributeMapping[key][data[key]];
    });
    return newObj;
  };

  getNewSet = () => {
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
    this.setState(
      () => ({
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
    rulesQueue = newRules.slice();
    if (rulesQueue.length > 0) {
      this.applySortingForRule(rulesQueue.pop());
    }
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
    this.setState(
      () => ({
        results: newSorting
      }),
      () => {
        if (rulesQueue.length > 0) {
          const aRule = rulesQueue.pop();
          this.applySortingForRule(aRule);
        }
      }
    );
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
