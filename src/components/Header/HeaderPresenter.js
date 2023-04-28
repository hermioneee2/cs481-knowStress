import { Affix } from "antd";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderPresenter = () => {
  return (
    <Affix offsetTop={0}>
      <Header>
        <Link to="/">
          <Logo>knowstress</Logo>
        </Link>
        <TabWrapper>
          <Link to="/">
            <Tab>
              <span class="material-symbols-rounded">person_celebrate</span>
              <TabTitle>My Stress Pattern</TabTitle>
            </Tab>
          </Link>
          <Link to="/meAndOthers">
            <Tab>
              <span class="material-symbols-rounded">diversity_3</span>
              <TabTitle>Me & Others</TabTitle>
            </Tab>
          </Link>
        </TabWrapper>
        <DateWrapper>
          <span class="material-symbols-rounded">calendar_today</span>{" "}
          <Date>04.10.23 - 04.16.23</Date>
        </DateWrapper>
      </Header>
    </Affix>
  );
};

const Logo = styled.div`
  color: ${(props) => props.theme.colors.logoColor};
  font-family: "Montserrat";
  font-size: 20px;
  font-weight: 700;
  margin-left: 30px;
`;

const Header = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-style: none none solid;
  border-color: ${(props) => props.theme.colors.topbarBorder};
  border-width: 1px;
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 400px;
  padding-top: 10px;
  justify-content: space-between;
  height: 100%;
`;

const Tab = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
  padding-left: 7px;
  padding-right: 10px;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.grayKS};
  height: 55px;
  border-style: none none solid;
  border-color: ${(props) => props.theme.colors.stress1};
  border-width: 4px;
  box-sizing: border-box;
`;

const TabTitle = styled.div`
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
  padding-left: 7px;
  padding-right: 10px;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.stress2};
  height: 100%;
`;

const Date = styled.div`
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 400;
  margin-left: 10px;
`;

export default HeaderPresenter;