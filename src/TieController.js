import React from "react";
import RulesContainer from "./components/Rules/RulesContainer";
import ResultsContainer from "./components/Results/ResultsContainer";

class TieController extends React.Component {
  state = {
    rules: [],
    results: []
  };

  updateResults = results => {
    console.log(results);
    this.setState({ results });
  };

  updateRules = rules => {
    console.log(rules);
    this.setState({ rules });
  };

  render() {
    return (
      <div className="main-container">
        <RulesContainer updateRules={this.updateRules} />
        <ResultsContainer updateResults={this.updateResults} />
      </div>
    );
  }
}

export default TieController;
