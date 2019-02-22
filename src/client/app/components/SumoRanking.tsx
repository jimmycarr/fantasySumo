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
        <PageHeader>Sumo Ranks for Current Basho</PageHeader>
        <div>{this.buildTable(this.state.data)}</div>
      </>
    );
  }

  private buildRow(sumoInfo: ISumoInfo) {
    return (
      <SumoRow key={sumoInfo.banzuke_id} rank={sumoInfo.banzuke_name}>
        <td key={"banzuke"}>{sumoInfo.banzuke_name}</td>
        <td key={"shikona"}>{sumoInfo.shikona}</td>
        <td key={"heya"}>{sumoInfo.heya_name}</td>
      </SumoRow>
    );
  }

  private buildTable(sumoData?: ISumoInfo[]) {
    if (sumoData) {
      const rows: JSX.Element[] = [];
      sumoData.forEach((sumo: ISumoInfo) => rows.push(this.buildRow(sumo)));

      return (
        <SumoTable>
          <tbody>
            <SumoHeaderRow>
              <th>Rank</th>
              <th>Name</th>
              <th>Heya</th>
            </SumoHeaderRow>
            {rows}
          </tbody>
        </SumoTable>
      );
    } else {
      return <div>Loading data...</div>;
    }
  }
}

// Styles

const PageHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin: 8px 24px;
`;

const SumoTable = styled.table`
  margin: 0 24px;
  width: 80%;
  border-collapse: collapse;
`;

interface SumoRowProps {
  rank: string;
}

const SumoRow = styled.tr`
  background-color: ${(props: SumoRowProps) =>
    props.rank == "Yokozuna"
      ? "#6697a8"
      : props.rank == "Ozeki"
      ? "#7fa9b7"
      : props.rank == "Sekiwake"
      ? "#99bac5"
      : props.rank == "Komusubi"
      ? "#b2cbd3"
      : "#ccdce2"};
`;

const SumoHeaderRow = styled.tr`
  background-color: #00536f;
  color: white;
`;

export default SumoRankTable;
