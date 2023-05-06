import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { Slider } from "antd";
import { theme } from "../styles/Theme";

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

const Dashboard4 = () => {
  const [ageRange, setAgeRange] = useState([15, 75]);
  const [appUsageRange, setAppUsageRange] = useState([1, 100]);
  const [movedDistanceRange, setMovedDistanceRange] = useState([1, 100]);

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
        <div style={{ marginTop: 0 }}>
          <StressYAxis />
          <div
            style={{
              display: "block",
              zIndex: 2,
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
        <div style={{ marginTop: 22 }}>
          <BoxPlot
            lowerQuartile={2.3}
            median={3.8}
            upperQuartile={4}
            min={0}
            max={6}
            myValue={5}
          />
        </div>
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
  margin-bottom: 10px;
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
  z-index: 1;
  position: absolute;
  margin-top: 8px;
  margin-left: 76px;
`;

export default Dashboard4;
