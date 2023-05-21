import React, {useState, useEffect} from "react";
import { alpha } from "@mui/material";
import {theme} from '../styles/Theme'
import BarChart from "../dashboardMinor/BarChart";


import styled from "styled-components";
import { Layout } from "antd";
import Board2Button from "../dashboardMinor/Board2Button";
import Images from "../dashboardMinor/Images";
const {Content, Sider } = Layout;


const Dashboard2 = () => {
  
  const dash2Data = [
   [ "Melon","Video/Contents","3.218100056211355" ],
   [  "MLB9이닝스19","Game","3.2933168316831685"],
   [  "NAVER","Browser","3.333652312599681"],
   [  "Instagram","Social Media","3.580088402441591"],
   [  "CYBOS Touch","Utility","3.583751253761284"],
   [  "Facebook","Social Media","3.6305197342712"],
   [  "YouTube","Video/Contents","3.635525141326986"],
   [   "Chrome","Browser","3.660663119115841"],
   [  "카카오톡","Messenger","3.6656425085848543"],
   [  "날씨","Utility","3.695156695156695"],
   [  "Bleacher Report","Utility","3.717136150234742"],
   [   "MTP","Utility","3.7354758961681087"],
   [  "전화","Messenger","3.8299024918743227"],
   [  "연락처","Utility","3.9095982142857144"],
   [  "Dropsync","Utility","3.9817495280050346"],
  ];

   const imgArr = dash2Data.map((arr) => require(`./images/${arr[0]}.png`))

  const newArray = [];

    dash2Data.map((item) => {
      if (item[1] === "Social Media") {
        newArray.push( theme.colors.socialMedia );
      } else if (item[1] === "Game") {
        newArray.push(  theme.colors.game );
      } else if (item[1] === "Messenger") {
        newArray.push(  theme.colors.communication );
      } else if (item[1] === "Video/Contents") {
        newArray.push(  theme.colors.videoStreaming );
      } else if (item[1] === "Utility") {
        newArray.push(  theme.colors.utility );
      } else if (item[1] === "Browser") {
        newArray.push(  theme.colors.browser );
      } 
    });
  
  const [arrColor, setArrColor] = useState([...newArray]);
  const [activeButton, setActiveButton] = useState(null);
    

  useEffect(() => {
    const updatedList = [...arrColor];
    if (activeButton===null){
      updatedList.map((item, i) => {
        updatedList[i] = alpha(updatedList[i], 1);
      })
    } else {
      dash2Data.map((item, i) => {
        if (item[1] !== activeButton) {
          updatedList[i] = alpha(updatedList[i], 0.1);
        } else {
          updatedList[i] = alpha(updatedList[i], 1);
        }
      });
    }
    setArrColor(updatedList);
  }, [activeButton]);


    const changeColor = (buttonId) =>{
      if (activeButton === buttonId) {
        setActiveButton(null); // unclicking the active button
      } else {
        setActiveButton(buttonId); // clicking a new button
      }
    };




  return (
    <div> 
      <GraphExplanation>The apps are your TOP 15 most used apps.</GraphExplanation>
      {/* <text style={{fontWeight: 'lighter', marginTop: 1, fontSize: 12,}}>The apps are your TOP 15 most used apps.</text> */}
    <Layout style={{ background: '#ffffff', marginTop: 20}}> 
      <Sider width={60} style={{ background: '#ffffff', paddingLeft:20}}>
        {/* <Images dash2Data={dash2Data.map((arr) => require(`./images/${arr[0]}.png`))} /> */}
        <Images dash2Data={imgArr.reverse()} />
      </Sider>
      <Content style={{display: 'flex', }} >
        <BarChart color={arrColor} dash2Data={dash2Data}/>
      </Content>
      <Sider style={{ background: '#ffffff', paddingLeft:20}}>
        <CategoryNames>Highlight By Category</CategoryNames>
        <Board2Button activeButton={activeButton} changeColor={changeColor} color={theme.colors.socialMedia} category={'Social Media'}/>
        <Board2Button activeButton={activeButton} changeColor={changeColor} color={theme.colors.game} category={'Game'}/>
        <Board2Button activeButton={activeButton} changeColor={changeColor} color={theme.colors.communicationWriting} category={'Messenger'}/>
        <Board2Button activeButton={activeButton} changeColor={changeColor} color={theme.colors.videoStreaming} category={'Video/Contents'}/>
        <Board2Button activeButton={activeButton} changeColor={changeColor} color={theme.colors.browser} category={'Browser'}/>
        <Board2Button activeButton={activeButton} changeColor={changeColor} color={theme.colors.utility} category={'Utility'}/>
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

const GraphExplanation = styled(Layout.Content)`
  display: block;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 11px;
  margin-bottom: 15px;
  color: ${(props) => props.theme.colors.grayKS};
  margin-top: -15px;
`;


export default Dashboard2;
