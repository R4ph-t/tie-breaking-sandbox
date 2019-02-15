import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RulesContainer from "./components/Rules/RulesContainer";
import ResultsContainer from "./components/Results/ResultsContainer";
import config from "./config.json";

const resultCount = 50;
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

    this.rulesQueue = [];
  }

  buildAHit = data => {
    //map readable attributes to ints
    const newObj = Object.assign({}, data);
    Object.keys(configLegos.attributeMapping).forEach(key => {
      newObj[key] = configLegos.attributeMapping[key][data[key]];
    });
    return newObj;
  };

  buildAllHits = data => {
    const tmpResultArr = [];
    for (let obj of data) {
      const hit = this.buildAHit(obj);
      tmpResultArr.push(hit);
    }
    return tmpResultArr;
  };

  getNewSet = () => {
    const tmpResultArr = this.buildAllHits(legos);
    for (let i = 0; i < resultCount - legos.length; i++) {
      const randLegoIdx = _.random(0, legos.length - 1);
      const hitData = legos[randLegoIdx];
      tmpResultArr.push(this.buildAHit(hitData));
    }
    return _.shuffle(tmpResultArr);
  };

  setNewSet = () => {
    this.setState({ results: this.getNewSet(resultCount) });
  };

  // rules ordered modified by user
  rulesUpdatedFromDrag = newRules => {
    this.setState(
      { rules: newRules },
      () => {
        this.updateResults(this.state.rules);
      }
    );
  };

  updateRules = rules => {
    this.setState({ rules });
  };

  // in game mode result order modified by player
  resultsUpdatedFromDrag = results => {
    this.setState({ results: results }, () => {
      //console.log(this.state.results[0]);
    });
  };

  // update results after Rule changed
  updateResults = newRules => {
    this.rulesQueue = newRules.slice();
    if (this.rulesQueue.length > 0) {
      this.applySortingForRule(this.rulesQueue.pop());
    }
  };

  // sort by one rule
  applySortingForRule = rule => {
    let currentResultsSorting = this.state.results;
    let newSorting = [];
    if (rule.isAsc) {
      newSorting = currentResultsSorting.sort((a, b) => {
        return a[rule.attribute] - b[rule.attribute];
      });
    } else {
      newSorting = currentResultsSorting.sort((a, b) => {
        return b[rule.attribute] - a[rule.attribute];
      });
    }

    this.setState(
      { results: newSorting },
      () => {
        if (this.rulesQueue.length > 0) {
          const aRule = this.rulesQueue.pop();
          this.applySortingForRule(aRule);
        }
      }
    );
  };

  updateSortingOrder = ruleToUpdate => {
    const rules = this.state.rules;
    rules.filter(elem => {
      if (elem.attribute === ruleToUpdate.attribute) {
        elem.isAsc = ruleToUpdate.isAsc;
        return true;
      } else {
        return false;
      }
    });
    this.setState(
      { rules: rules },
      () => {
        this.updateResults(this.state.rules);
      }
    );
  };

  render() {
    const resultsToshow = this.state.results || [];
    const rulesToshow = this.state.rules || [];

    return (
      <div>
        <div className="nav-bar-container">
          <nav className="nav-bar">
            <div className="nav-bar-title">Tie-Breaking Sandbox</div>
            <div className="nav-bar-btns">
              <button className="button-danger" onClick={this.setNewSet}>
                NewSet <FontAwesomeIcon icon="plus-circle" />
              </button>
              <button
                className="button-success"
                onClick={this.updateSortingOrder}
              >
                Apply Sorting <FontAwesomeIcon icon="check-square" />
              </button>
            </div>
          </nav>
        </div>
        <div className="main-container">
          <RulesContainer
            rules={rulesToshow}
            updateRules={this.updateRules}
            updateSortingOrder={this.updateSortingOrder}
            rulesUpdatedFromDrag={this.rulesUpdatedFromDrag}
            isDraggable={true}
          />
          <ResultsContainer
            axis={"xy"}
            results={resultsToshow}
            updateResults={this.updateResults}
            resultsUpdatedFromDrag={this.resultsUpdatedFromDrag}
            isDraggable={false}
          />
        </div>
      </div>
    );
  }
}

export default TieController;
