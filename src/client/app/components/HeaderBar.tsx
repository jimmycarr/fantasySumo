import * as React from "react";
import styled from "styled-components";

class HeaderBar extends React.Component {
  public render() {
    return (
      <FullSpanBar>
        <div>Welcome to Fantasy Sumo! - ファンタジー相撲</div>
      </FullSpanBar>
    );
  }
}

const FullSpanBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 8px;
  background-color: black;
  color: white;
  z-index: 100;
`;
export default HeaderBar;
