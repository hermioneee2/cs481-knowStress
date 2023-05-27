import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import DashboardContentSwitcher from "./DashboardContentSwitcher";
import { BulbFilled, TrophyFilled, SignalFilled } from "@ant-design/icons";
import { theme } from "../styles/Theme";

const Dashboard = ({ title, page1, subtitle, dashboardNum }) => {
  const iconStyle = {
    fontSize: "23px",
    color: theme.colors.stress1,
    marginRight: `10px`,
    marginTop: `3px`,
  };

  return (
    <div>
      {dashboardNum === 4 ? (
        <Dashboard4Container>
          <DashboardTitleWrapper>
            <TrophyFilled style={iconStyle} />
            <DashboardTitle>{title}</DashboardTitle>
          </DashboardTitleWrapper>
          <DashboardContentSwitcher dashboardNum={dashboardNum} />
        </Dashboard4Container>
      ) : (
        <div>
          {dashboardNum === 5 ? (
            <Dashboard4Container>
              <DashboardTitleWrapper>
                <SignalFilled style={iconStyle} />
                <DashboardTitle>{title}</DashboardTitle>
              </DashboardTitleWrapper>
              <DashboardContentSwitcher dashboardNum={dashboardNum} />
            </Dashboard4Container>
          ) : (
            <DashboardContainer>
              <Title>
                {page1}
                <SubTitle>{subtitle}</SubTitle>
              </Title>
              <DashboardContentSwitcher dashboardNum={dashboardNum} />
            </DashboardContainer>
          )}
        </div>
      )}
    </div>
  );
};

const DashboardContainer = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.white};
  margin-left: auto;
  margin-right: auto;
  width: 65%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 40px;
  padding-right: 60px;
  border-radius: 20px;
  box-shadow: 0px 4px 10px 0 rgba(0, 0, 0, 0.1);
`;

const Dashboard4Container = styled(Layout.Content)`
  background-color: ${(props) => props.theme.colors.white};
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 40px;
  padding-right: 60px;
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
