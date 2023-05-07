import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import Dashboard from "../../components/Dashboard";

const MeAndOthersPresenter = () => {
  return (
    <ContentContainer>
      <Dashboard title="What is My Stress Rank in Group?" dashboardNum={4} />
      <Dashboard title="test5" dashboardNum={5} />
    </ContentContainer>
  );
};

const ContentContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.mainBgLightGray};
`;

export default MeAndOthersPresenter;
