import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

const BgColor = () => {
  return (
    <ContentContainer>
      <div style={{ height: "1000px" }}>Dashboard 1</div>
      <div style={{ height: "1000px" }}>Dashboard 2</div>
      <div style={{ height: "1000px" }}>Dashboard 3</div>
    </ContentContainer>
  );
};

const ContentContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.mainBgLightGray};
`;

export default BgColor;
