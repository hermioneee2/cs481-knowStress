import React from "react";
import styled from "styled-components";
import { Layout } from "antd";

const Dashboard5 = () => {
  return (
    <ContentLayout>
      <CategorySelectionLayout>
        <StepWrapper>
          <StepHeader>Step 1</StepHeader>
          <StepTitle>Select Category</StepTitle>
        </StepWrapper>
        <div>Buttons here...</div>
      </CategorySelectionLayout>
      <ResultGraphLayout>
        <StepWrapper>
          <StepHeader>Step 2</StepHeader>
          <StepTitle>View Stress Level Distribution</StepTitle>
        </StepWrapper>
        <div>Graph here...</div>
      </ResultGraphLayout>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
`;

const CategorySelectionLayout = styled.div``;

const ResultGraphLayout = styled.div`
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

export default Dashboard5;
