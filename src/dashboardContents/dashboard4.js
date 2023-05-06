import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/Theme";
import { DownOutlined } from "@ant-design/icons";
import { Layout, Slider, Collapse, theme as antdTheme } from "antd";

import StressCodeBoxPlot from "../dashboardMinor/StressCodeBoxPlot";
import BoxPlot from "../dashboardMinor/BoxPlot";

// For sliders
const age_marks = {
  15: "15",
  26: "me",
  75: "75",
};

const app_usage_marks = {
  100: "Least Usage",
  26: "me",
  1: "Most Usage",
};

const moved_distance_marks = {
  100: "Least Active",
  26: "me",
  1: "Most Active",
};

const applyCommonMarkStyle = (marks) => {
  for (const key in marks) {
    if (Object.prototype.hasOwnProperty.call(marks, key)) {
      marks[key] = {
        style: commonMarkStyle,
        label: marks[key],
      };
    }
  }
};

const formatter = (value) => {
  return `Top ${value}%`;
};

// textbox
const { Panel } = Collapse;

const Dashboard4 = () => {
  const [ageRange, setAgeRange] = useState([15, 75]);
  const [appUsageRange, setAppUsageRange] = useState([1, 100]);
  const [movedDistanceRange, setMovedDistanceRange] = useState([1, 100]);
  const topValue = 20;
  const numOfPeople = 77;
  const myValue = 5.1;

  const onAfterChangeSlider = (value, sliderName) => {
    switch (sliderName) {
      case "age":
        setAgeRange(value);
        break;
      case "appUsage":
        setAppUsageRange(value);
        break;
      case "movedDistance":
        setMovedDistanceRange(value);
        break;
      default:
        break;
    }
  };

  // const printSliderRanges = () => {
  //   console.log(`Age: ${ageRange[0]} - ${ageRange[1]}`);
  //   console.log(`App Usage: ${appUsageRange[0]} - ${appUsageRange[1]}`);
  //   console.log(
  //     `Moved Distance: ${movedDistanceRange[0]} - ${movedDistanceRange[1]}`
  //   );
  // };

  // text
  const { token } = antdTheme.useToken();
  const panelStyle = {
    marginBottom: 15,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
    fontFamily: "Open Sans",
    fontSize: "12px",
  };

  const PeoplRangeExplanation = (
    <>
      Among{" "}
      <span
        style={{
          fontWeight: 700,
          color: theme.colors.selectionBlue,
        }}
      >
        {numOfPeople}
      </span>{" "}
      people in the group
    </>
  );

  const boxplotExplanation1 = (
    <>
      <span style={{ color: theme.colors.stress3 }}>
        My average stress level of {myValue} ranked in top {topValue}% among{" "}
        {numOfPeople} people in the group.
      </span>{" "}
      Top 1% indicates the most stressed and top 100% indicates the least
      stressed in the group. The closer your ranking is to top 1%, the more
      stressed you are compared to the group.
    </>
  );

  const boxplotExplanation2 = (
    <>
      In the order of top to bottom, each horizontal lines indicates such
      values:
      <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
        <li>100th percentiles: Maximum </li>
        <li>75th percentiles: Third quartile (Q3)</li>
        <li>50th percentiles: Median (Q2)</li>
        <li>25th percentiles: First quartile (Q1)</li>
        <li>0th percentiles: Minimum</li>
      </ul>
      This means that Q1 represents the value below which 25% of the data falls,
      Q2 represents the value below which 50% of the data falls, etc. The box
      represents the middle 50% of the data, between the first quartile (Q1) and
      the third quartile (Q3).
    </>
  );

  return (
    <ContentLayout>
      <SliderLayout>
        <StepWrapper>
          <StepHeader>Step 1</StepHeader>
          <StepTitle>Select Interest Group</StepTitle>
        </StepWrapper>
        <SliderWrapper>
          <SliderHeader>Age</SliderHeader>
          <Slider
            range
            marks={age_marks}
            min={15}
            max={75}
            defaultValue={[15, 75]}
            style={{ width: "200px" }}
            onAfterChange={(value) => onAfterChangeSlider(value, "age")}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderHeader>App Usage</SliderHeader>
          <Slider
            range
            marks={app_usage_marks}
            min={1}
            max={100}
            defaultValue={[1, 100]}
            tooltip={{ formatter }}
            reverse={true}
            style={{ width: "200px" }}
            onAfterChange={(value) => onAfterChangeSlider(value, "appUsage")}
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderHeader>Moved Distance</SliderHeader>
          <Slider
            range
            marks={moved_distance_marks}
            min={1}
            max={100}
            defaultValue={[1, 100]}
            tooltip={{ formatter }}
            reverse={true}
            style={{ width: "200px" }}
            onAfterChange={(value) =>
              onAfterChangeSlider(value, "movedDistance")
            }
          />
        </SliderWrapper>
        <SliderWrapper>
          <SliderHeader>Location near</SliderHeader>
        </SliderWrapper>
      </SliderLayout>
      <BoxplotLayout>
        <StepWrapper>
          <StepHeader>Step 2</StepHeader>
          <StepTitle>View My Rank</StepTitle>
        </StepWrapper>
        <p
          style={{
            margin: "10 0",
            fontFamily: "Open Sans",
            fontSize: "15px",
            fontWeight: 300,

            color: theme.colors.grayKS,
          }}
        >
          {PeoplRangeExplanation}
        </p>
        <BoxplotWrapper>
          <BoxplotGraph>
            <div style={{ marginTop: 0 }}>
              <StressYAxis />
              <div
                style={{
                  display: "block",
                  zIndex: 3,
                  position: "absolute",
                  marginTop: 5,
                }}
              >
                <StressCodeBoxPlot
                  color={theme.colors.stress6}
                  t={6}
                  lev={"Very Stressed"}
                />
                <StressCodeBoxPlot color={theme.colors.stress5} t={5} />
                <StressCodeBoxPlot color={theme.colors.stress4} t={4} />
                <StressCodeBoxPlot color={theme.colors.stress3} t={3} />
                <StressCodeBoxPlot color={theme.colors.stress2} t={2} />
                <StressCodeBoxPlot color={theme.colors.stress1} t={1} />
                <StressCodeBoxPlot
                  color={theme.colors.stress0}
                  t={0}
                  lev={"Not Stressed"}
                />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <BoxPlot
                lowerQuartile={2.3}
                median={3.8}
                upperQuartile={4}
                min={0}
                max={6}
                myValue={myValue}
              />
            </div>
          </BoxplotGraph>
          <MyRankingTextWrapper>
            <MyRankingTextLeft>{myValue}</MyRankingTextLeft>
            <MyRankingTextRight>
              <MyRankingTitle>My Stress Ranking</MyRankingTitle>
              <TopNPercent>Top {topValue}%</TopNPercent>
            </MyRankingTextRight>
          </MyRankingTextWrapper>
        </BoxplotWrapper>
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          expandIconPosition="end"
          style={{
            background: token.colorBgContainer,
            marginTop: 50,
            width: "400px",
          }}
        >
          <Panel header="My Stress Ranking" key="1" style={panelStyle}>
            <p
              style={{
                margin: 0,
                fontFamily: "Open Sans",
                color: theme.colors.grayKS,
              }}
            >
              {boxplotExplanation1}
            </p>
          </Panel>
          <Panel header="How to Read Box Plot" key="2" style={panelStyle}>
            <p
              style={{
                margin: 0,
                fontFamily: "Open Sans",
                color: theme.colors.grayKS,
              }}
            >
              {boxplotExplanation2}
            </p>
          </Panel>
        </Collapse>
      </BoxplotLayout>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
`;

const SliderLayout = styled.div``;

const BoxplotLayout = styled.div`
  margin-left: 60px;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StepHeader = styled.div`
  width: 67px;
  height: 29px;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 400;
  margin-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 15px;
  color: ${(props) => props.theme.colors.grayKS};
  background-color: ${(props) => props.theme.colors.selectedSidebarKS};
`;

const StepTitle = styled.div`
  font-family: "Open Sans";
  font-size: 15px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grayKS};
`;

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 300px
  padding-top: 10px;
  margin-left: 10px;
`;

const SliderHeader = styled.div`
  width: 100px;
  font-family: "Open Sans";
  font-size: 13px;
  font-weight: 300;
  margin-right: 40px;
  padding-bottom: 15px;
  color: ${(props) => props.theme.colors.grayKS};
`;

const commonMarkStyle = {
  color: "#7B7B7B",
  fontFamily: "Open Sans",
  fontSize: "8px",
  fontWeight: "300",
  marginTop: "5px",
  width: "60px",
};

applyCommonMarkStyle(age_marks);
applyCommonMarkStyle(app_usage_marks);
applyCommonMarkStyle(moved_distance_marks);

const StressYAxis = styled.div`
  height: 219px;
  width: 2px;
  background: linear-gradient(
    ${(props) => props.theme.colors.stress5},
    ${(props) => props.theme.colors.stress2},
    ${(props) => props.theme.colors.stress0}
  );
  z-index: 2;
  position: absolute;
  margin-top: 8px;
  margin-left: 76px;
`;

const BoxplotWrapper = styled.div`
  display: flex;
`;

const BoxplotGraph = styled.div`
  width: 300px;
`;

const MyRankingTextWrapper = styled.div`
  display: flex;
  z-index: 1;
  position: absolute;
  margin-left: 200px;
  margin-top: -23px;
`;

const MyRankingTextLeft = styled.div`
  margin-top: 20px;
  margin-right: 8px;
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.me};
`;

const MyRankingTextRight = styled.div`
  display: block;
`;

const MyRankingTitle = styled.div`
  font-family: "Open Sans";
  font-size: 10px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grayKS};
`;

const TopNPercent = styled.div`
  font-family: "Open Sans";
  font-size: 23px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.me};
`;

export default Dashboard4;
