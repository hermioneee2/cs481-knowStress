import React, {useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {theme} from '../styles/Theme'
import Button from '@mui/material/Button';
import { alpha } from "@mui/material";
import CustomBarChart from "../dashboardMinor/customBarChart";

// const CustomBarChart = () => {
//     return (
//         <VictoryChart
//         responsive={false}
//         width={500}
//         animate={{
//             duration:1000,
//             onLoad:{duration:200}
//         }}
//         theme={VictoryTheme.material}
//         domainPadding={0}

//         >
//         <VictoryAxis/>
//         <VictoryBar
//             barRatio={1}
//             style = {{data:{fill: theme.colors.stress3}}}
//             tickLabelComponent={<VictoryLabel angle={45} textAnchor="start"/>}
//             alignment="middle"
//             // labels={d=>d.y}
//             data={[
//                 { x: '0-9', y: 3.12},
//                 { x: '10-19', y: 2.71},
//                 { x: '20-29', y: 2.62},
//                 { x: '30-39', y: 2.74},
//                 { x: '40-49', y: 3.33},
//                 { x: '50-59', y: 2.68},
//                 { x: '60-69', y: 2.75},
//                 { x: '70-79', y: 2.20},
//                 { x: '80-89', y: 2.91},
//                 { x: '90-99', y: 2.88}
              
//             ]}
//         />
//         </VictoryChart>
//     );
// }


const buttonStyle = (color) => {
    return ({
        textAlign: 'center',
        fontSize: '10px', 
        height:'22px', 
        boxShadow: 1, 
        marginBottom:1,
        margin:0.5, 
        padding:0.5,
        display:'flex', 
        flexDirection: 'column',
        color: color, 
        backgroundColor: alpha(color, 0.1),
        display:'inline'
    });
};

const buttonStyle2 = (color) => {
    return ({
        textAlign: 'center',
        fontSize: '15px', 
        height:'33px', 
        boxShadow: 1, 
        marginBottom:5,
        margin:0.5,
        padding:0.5,
        display:'flex', 
        flexDirection: 'column',
        color: color, 
        backgroundColor: alpha(color, 0.02) ,
        display:'inline'
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
        <Button value={'Age'} onClick={()=>changeColor('Age')} sx={buttonStyle2(theme.colors.blackKS)} variant="text">{'Age'}</Button>
        <Button value={'Movement'} onClick={()=>changeColor('Movement')} sx={buttonStyle2(theme.colors.blackKS)} variant="text">{'Movement'}</Button>
        <Button value={'Sleep Time'} onClick={()=>changeColor('Sleep Time')} sx={buttonStyle2(theme.colors.blackKS)} variant="text">{'Sleep Time'}</Button>
        <Button value={'Total App Usage'} onClick={()=>changeColor('Total App Usage')} sx={buttonStyle2(theme.colors.blackKS)} variant="text">{'Total App Usage'}</Button>
        <div></div>
        <Button value={'Social Media'} onClick={()=>changeColor('Social Media')} sx={buttonStyle(theme.colors.socialMedia)} variant="text">{'Social Media'}</Button>
        <Button value={'Game'} onClick={()=>changeColor('Game')} sx={buttonStyle(theme.colors.game)} variant="text">{'Game'}</Button>
        <Button value={'Messenger'} onClick={()=>changeColor('Messenger')} sx={buttonStyle(theme.colors.communicationWriting)} variant="text">{'Messenger'}</Button>
        <Button value={'Video/Contents'} onClick={()=>changeColor('Video/Contents')} sx={buttonStyle(theme.colors.videoStreaming)} variant="text">{'Video/Contents'}</Button>
        <Button value={'Browser'} onClick={()=>changeColor('Browser')} sx={buttonStyle(theme.colors.browser)} variant="text">{'Browser'}</Button>
        <Button value={'Utility'} onClick={()=>changeColor('Utility')} sx={buttonStyle(theme.colors.utility)} variant="text">{'Utility'}</Button>
      </CategorySelectionLayout>

      <ResultGraphLayout>
        <StepWrapper>
          <StepHeader>Step 2</StepHeader>
          <StepTitle>View Stress Level Distribution</StepTitle>
        </StepWrapper>
        <CustomBarChart category={activeButton}/>
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
