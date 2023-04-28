import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

const Dashboard4 = () => {
  return (
    <div>
      <div style={{ height: "500px" }}>Dashboard 4</div>
    </div>
  );
};

const ContentContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.mainBgLightGray};
`;

export default Dashboard4;
