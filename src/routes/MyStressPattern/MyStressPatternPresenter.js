import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import Dashboard from "../../components/Dashboard";

const MyStressPatternPresenter = () => {
  return (
    <ContentContainer>
      <Dashboard title="test" dashboardNum={1} />
      <Dashboard title="test2" dashboardNum={2} />
      <Dashboard title="test3" dashboardNum={3} />
    </ContentContainer>
  );
};

const ContentContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.mainBgLightGray};
`;

export default MyStressPatternPresenter;
