import React, {useState} from "react";
import Plot from 'react-plotly.js';
import Button from '@mui/material/Button';
import { alpha } from "@mui/material";
import {theme} from '../styles/Theme'
import BarChart from "../dashboardMinor/BarChart";


import styled from "styled-components";
import { Layout } from "antd";
import Board2Button from "../dashboardMinor/Board2Button";
const {Content, Sider } = Layout;


const Dashboard2 = () => {
  
  const dash2Data = [['Z', 'Messenger', 2.67],['A', 'Messenger', 2.67],['B', 'Messenger', 2.67],['C', 'Messenger', 2.67],['D', 'Messenger', 2.67],['E', 'Messenger', 2.67],['Kakao Talk', 'Messenger', 2.67],['Instagram', 'Social Media', 6],['Twitter', 'Social Media', 3],]
  const newArray = [];

    dash2Data.map((item) => {
      if (item[1] === "Social Media") {
        newArray.push( theme.colors.socialMedia );
      } else if (item[1] === "Game") {
        newArray.push(  theme.colors.game );
      } else if (item[1] === "Messenger") {
        newArray.push(  theme.colors.communication );
      } else if (item[1] === "Video Streaming") {
        newArray.push(  theme.colors.videoStreaming );
      } else if (item[1] === "Utility") {
        newArray.push(  theme.colors.utilit );
      } else if (item[1] === "Etc") {
        newArray.push(  theme.colors.etc );
      } 
    });
  
  const [arrColor, setArrColor] = useState([...newArray]);
    

  // const initialColor = () => {
  //   setArrColor([...arrColor, ...newArray]);
  // };

 const changeColor = (event) => {
    const updatedList = [...arrColor];
    dash2Data.map((item, i) => {
      if (item[1] !== event.target.value) {
        updatedList[i] = alpha(updatedList[i], 0.1)
      } else {
          updatedList[i] = alpha(updatedList[i], 1)
      }
    });
    setArrColor(updatedList);
  }




  return (
    <div>
    <Layout style={{ background: '#ffffff'}}> 
      <Content style={{display: 'flex', }} >
        {/* {/* <Plot data = {data} config={{displayModeBar:false}} layout={{width: 600,xaxis:{title: "Average Stress Level", range: [0, 6]}}} /> */}
        <BarChart color={arrColor} dash2Data={dash2Data}/>
      </Content>
      <Sider style={{ background: '#ffffff', paddingLeft:20}}>
        <CategoryNames>Highlight By Category</CategoryNames>
        <Board2Button changeColor={changeColor} color={theme.colors.socialMedia} category={'Social Media'}/>
        <Board2Button changeColor={changeColor} color={theme.colors.game} category={'Game'}/>
        <Board2Button changeColor={changeColor} color={theme.colors.communicationWriting} category={'Messenger'}/>
        <Board2Button changeColor={changeColor} color={theme.colors.videoStreaming} category={'Video Streaming'}/>
        <Board2Button changeColor={changeColor} color={theme.colors.utility} category={'Utility'}/>
        <Board2Button changeColor={changeColor} color={theme.colors.etc} category={'Etc'}/>

      </Sider>
    </Layout>
      
    </div>
  );
};

const CategoryNames = styled(Layout.Content)`
  display: block;
  font-size: 11px;
  font-weight: 400;
  font-family: "Open Sans";
  margin-bottom: 15px;

`;


export default Dashboard2;
