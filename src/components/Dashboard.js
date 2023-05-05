import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import DashboardContentSwitcher from "./DashboardContentSwitcher";

const Dashboard = ({ title, page1, subtitle, dashboardNum }) => {
  return (
    <DashboardContainer>
      <DashboardTitle>{title}</DashboardTitle>
      <Title>{page1}
        <SubTitle>{subtitle}</SubTitle>
      </Title> 
      <DashboardContentSwitcher dashboardNum={dashboardNum} />
    </DashboardContainer>
  );
};

const DashboardContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.white};
  margin-left: 300px;
  margin-right: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 15px;
  padding-left: 34px;
  padding-right: 34px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

const DashboardTitle = styled(Layout.Content)`
  color: ${(props) => props.theme.colors.stress6};
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Title = styled(Layout.Content)`
  color: ${(props) => props.theme.colors.grayKS};
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 28px;
`;

const SubTitle = styled.span`
  color: ${(props) => props.theme.colors.blackKS};
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 28px;
`;

export default Dashboard;
