import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { Slider } from "antd";

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

const Dashboard4 = () => {
  return (
    <div>
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
          reverse={true}
          style={{ width: "200px" }}
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
          reverse={true}
          style={{ width: "200px" }}
        />
      </SliderWrapper>
      <SliderWrapper>
        <SliderHeader>Location near</SliderHeader>
      </SliderWrapper>
    </div>
  );
};

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

export default Dashboard4;
