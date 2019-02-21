import * as React from "react";
import styled from "styled-components";

class HeaderBar extends React.Component {
  public render() {
    return <FullSpanBar>Welcome to Fantasy Sumo</FullSpanBar>;
  }
}

const FullSpanBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: black;
  color: white;
  z-index: 100;
`;
export default HeaderBar;
