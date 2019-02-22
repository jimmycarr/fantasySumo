import React, { Component } from "react";
import HeaderBar from "./HeaderBar";
import SumoRankTable from "./SumoRanking";

class App extends Component {
  public render() {
    return (
      <>
        <HeaderBar />
        <SumoRankTable />
      </>
    );
  }
}

export default App;
