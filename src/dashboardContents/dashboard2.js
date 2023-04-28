import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

const Dashboard2 = () => {
  return (
    <div>
      <div style={{ height: "500px" }}>Dashboard 2</div>
    </div>
  );
};

const ContentContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.mainBgLightGray};
`;

export default Dashboard2;
