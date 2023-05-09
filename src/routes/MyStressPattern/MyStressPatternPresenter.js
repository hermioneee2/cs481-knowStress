import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import Dashboard from "../../components/Dashboard";

const MyStressPatternPresenter = () => {
  return (
    <ContentContainer>
      <Dashboard page1="Average Stress Level By " subtitle="Time" dashboardNum={1} />
      <Dashboard page1="Average Stress Level By " subtitle="Application" dashboardNum={2} />
      <Dashboard page1="Average Stress Level By " subtitle="Location" dashboardNum={3} />
    </ContentContainer>
  );
};

const ContentContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.mainBgLightGray};
`;

export default MyStressPatternPresenter;
