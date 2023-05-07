import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import DashboardContentSwitcher from "./DashboardContentSwitcher";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { theme } from "../styles/Theme";

const Dashboard = ({ title, dashboardNum }) => {
  const iconStyle = {
    fontSize: "28px",
    color: theme.colors.stress1,
    marginRight: `10px`,
  };

  return (
    <DashboardContainer>
      <DashboardTitleWrapper>
        {dashboardNum === 4 || dashboardNum === 5 ? (
          <QuestionCircleOutlined style={iconStyle} />
        ) : null}
        <DashboardTitle>{title}</DashboardTitle>
      </DashboardTitleWrapper>
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
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 34px;
  padding-right: 34px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

const DashboardTitleWrapper = styled(Layout.Content)`
  display: flex;
`;

const DashboardTitle = styled(Layout.Content)`
  color: ${(props) => props.theme.colors.stress6};
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
`;

export default Dashboard;
