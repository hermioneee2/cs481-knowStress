import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {theme} from '../styles/Theme'
import { Layout } from 'antd';
import Button from '@mui/material/Button';
import { alpha } from "@mui/material";
import CustomBarChart from "../dashboardMinor/customBarChart";


const buttonStyle = (color) => {
    return ({
        gap:'10px',
        paddingBottom:'4px',
        paddingHorizontal:'8px',

        display:'flex', 
        flexDirection: 'row',
        justifyContent:'center',
        allignItems:'flex-start',
        height:'22px', 

        textTransform:'none',
        textAlign: 'center',
        color: color, 

        fontFamily : 'Open Sans',
        fontWeight: 600,
        fontStyle:'normal',
        fontSize: '10px', 
        lineHeight:'14px',

        backgroundColor: alpha(color, 0.1),
        boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.1)',
        borderRadius: '7px',

        display:'inline',
    });
};

const buttonStyle2 = (color) => {
    return ({
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        allignItems:'center',
        paddingHorizontal:'20px',
        paddingBottom:'10px',
        gap:'10px',

        height:'39px', 

        backgroundColor: 'White',
        boxShadow: '0px 2px 7px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',

        textTransform:'none',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '19px',
        color: color, 
        fontFamily : 'Open Sans'
    });
};


const Dashboard5 = () => {
    const newArray=[];
    const [arrColor, setArrColor] = useState([...newArray]);
    const [activeButton, setActiveButton] = useState(null);
    const changeColor = (buttonId) =>{
        if (activeButton === buttonId) {
          setActiveButton(null); // unclicking the active button
        } else {
          setActiveButton(buttonId); // clicking a new button
        }
      };
      
    const HistogramExplanation = (
        activeButton ? <>
        Relationship between Stress Level and {activeButton}
        </> : 
        <>　</>
    );
    const BarChartExplanationString = () => {
        switch(activeButton){
            case "Age": return <>It seems: the higher the age, the higher the stress level.</>;
            case "Total App Usage": return <>It seems: total app usage time is not really related with stress level.</>;
            case "Movement": return <>It seems: movement is not really related with stress level.</>;
            case "Sleep Time": return <>It seems: too less or much sleeping is related with higher stress level.</>;
            case "Social Media": return <>It seems: social media usage time is not really related with stress level.</>;
            case "Game": return <>It seems: the higher the game playing time, the higher the stress level.</>;
            case "Messenger": return <>It seems: messenger usage time is not really related with stress level.</>;
            case "Video/Contents": return <>It seems: the lower the video/contents using time, the higher the stress level.</>;
            case "Browser": return <>It seems: too less or much browser using is related with higher stress level.</>;
            case "Utility": return <>It seems: the higher the utility using time, the higher the stress level.</>;
            default: return <></>;
    
        }
    }
    

    useEffect(() => {
        const updatedList = [...arrColor];
        if (activeButton===null){
          updatedList.map((item, i) => {
            updatedList[i] = alpha(updatedList[i], 1);
          })
        } 
        setArrColor(updatedList);
      }, [activeButton]);
  return (
    <ContentLayout>
      <CategorySelectionLayout>
        <StepWrapper>
          <StepHeader>Step 1</StepHeader>
          <StepTitle>Select Category</StepTitle>
        </StepWrapper>
        <div style={{ display: 'flex', gap:'12px' }}>
            <Button value={'Age'} onClick={()=>changeColor('Age')} sx={buttonStyle2(theme.colors.blackKS)} variant="text">{'Age'}</Button>
            <Button value={'Movement'} onClick={()=>changeColor('Movement')} sx={buttonStyle2(theme.colors.blackKS)} variant="text">{'Movement'}</Button>
            <Button value={'Sleep Time'} onClick={()=>changeColor('Sleep Time')} sx={buttonStyle2(theme.colors.blackKS)} variant="text">{'Sleep Time'}</Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: '10px' }}>
            <Button value={'Total App Usage'} onClick={()=>changeColor('Total App Usage')} sx={{ ...buttonStyle2(theme.colors.blackKS)}} variant="text">{'Total App Usage'}</Button>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', gap:'7px' }}>
            <div style={{ display: 'flex' }}>
                <Button value={'Social Media'} onClick={()=>changeColor('Social Media')} sx={buttonStyle(theme.colors.socialMedia)} variant="text">{'Social Media'}</Button>
                <Button value={'Game'} onClick={()=>changeColor('Game')} sx={buttonStyle(theme.colors.game)} variant="text">{'Game'}</Button>
                <Button value={'Messenger'} onClick={()=>changeColor('Messenger')} sx={buttonStyle(theme.colors.communicationWriting)} variant="text">{'Messenger'}</Button>
            </div>
            <div style={{ display: 'flex' }}>
                <Button value={'Video/Contents'} onClick={()=>changeColor('Video/Contents')} sx={buttonStyle(theme.colors.videoStreaming)} variant="text">{'Video/Contents'}</Button>
                <Button value={'Browser'} onClick={()=>changeColor('Browser')} sx={buttonStyle(theme.colors.browser)} variant="text">{'Browser'}</Button>
                <Button value={'Utility'} onClick={()=>changeColor('Utility')} sx={buttonStyle(theme.colors.utility)} variant="text">{'Utility'}</Button>
            </div>
            </div>
        </div>
        </CategorySelectionLayout>

      <ResultGraphLayout>
        <StepWrapper>
          <StepHeader>Step 2</StepHeader>
          <StepTitle>View Stress Level Distribution</StepTitle>
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
          {HistogramExplanation}
        </p>

        <CustomBarChart category={activeButton}/>
        <div style={{marginBottom: '20px'}}></div>
        <BarChartExplanation>
        <text style={{marginBottom: '10px', fontFamily: "Open Sans",fontWeight: '400', color:theme.colors.grayKS}}>
        {(activeButton)&&BarChartExplanationString(activeButton)}
        </text>
        </BarChartExplanation>
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

const BarChartExplanation = styled(Layout.Content)`
  display: block;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 11px;
  margin-bottom: 15px;
  background-color: 
  color: ${(props) => props.theme.colors.grayKS};
  background: ${(props) => props.theme.colors.explanationBackground};
  margin-top: 10px;
  border-radius: 10px;
`;

export default Dashboard5;
