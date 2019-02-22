import * as React from "react";
import styled from "styled-components";
import winston = require("winston");

interface IState {
  data: any;
}

interface ISumoInfo {
  banzuke_id: number;
  rikishi_id: string;
  shikona: string;
  banzuke_name: string;
  heya_name: string;
}

class SumoRankTable extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: null
    };
  }

  public async componentDidMount() {
    await fetch("/api/get-rankings")
      .then((response: Response) => {
        return response.json();
      })
      .catch((err: Error) => {
        winston.log("error", "There was an error fetching data", err);
        return JSON.stringify(err);
      })
      .then((data: ISumoInfo[]) => {
        return this.setState({ data });
      });
  }

  public render() {
    return (
      <>
        <div>The Sumos are: </div>
        <div>{this.buildTable(this.state.data)}</div>
      </>
    );
  }

  private buildRow(sumoInfo: ISumoInfo) {
    return (
      <tr key={sumoInfo.banzuke_id}>
        <td key={"banzuke"}>{sumoInfo.banzuke_name}</td>
        <td key={"shikona"}>{sumoInfo.shikona}</td>
        <td key={"heya"}>{sumoInfo.heya_name}</td>
      </tr>
    );
  }

  private buildTable(sumoData?: ISumoInfo[]) {
    if (sumoData) {
      const rows: JSX.Element[] = [];
      sumoData.forEach((sumo: ISumoInfo) => rows.push(this.buildRow(sumo)));

      return (
        <table>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Heya</th>
            </tr>
            {rows}
          </tbody>
        </table>
      );
    } else {
      return <div>Loading data...</div>;
    }
  }
}

export default SumoRankTable;
