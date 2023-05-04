import React from "react";
import Plot from 'react-plotly.js';
import Button from '@mui/material/Button';
import {theme} from '../styles/Theme'
import { alpha } from "@mui/material";

import styled from "styled-components";
import { Layout } from "antd";
const {Content, Sider } = Layout;


const Dashboard2 = () => {

  // let arrColor = []

  // const getCategoryColor = arr.map((item) => {
  //   if (item.category === "SocialMedia") {
  //     arrColor.push(theme.colors.socialMedia)
  //   } else if (item === "Game") {
  //     arrColor.push(theme.colors.game)
  //   } else if (item === "Messenger") {
  //     arrColor.push(theme.colors.communication)
  //   } else if (item === "videoStreaming") {
  //     arrColor.push(theme.colors.videoStreaming)
  //   } else if (item === "utility") {
  //     arrColor.push(theme.colors.utility)
  //   } else if (item === "etc") {
  //     arrColor.push(theme.colors.etc)
  //   } 
  //   return 
  // });

  // const changeColor = (categ) = arr.map((item, i) => {
  //   if (item.category !== categ) {
  //     arrColor[i] = alpha(arrColor[i], 0.1)
  //   } 
  // });
  

  const data = [
    {
      x: [4, 5, 6, 1, 4],  //d.x
      y: ["Comedy", "Action", "Romance", "Drama", "Scifi"],  //d.y 이런식으로해서 아예 '그림'을 가져오기?
      type: "bar",
      orientation: "h",
      marker: {color: ['blue', 'blue','blue','blue','blue','blue']}, //d.color - 얘도 category 별 색상을 가져와야 할 듯
      //+버튼 클릭 이벤트 있을 시 category 별 색상 변경해서 가져오기
      //getCategoryColor
      // displayModeBar: 'false',
      hoverinfo: 'skip',
    },
  ];

  // const CustomButtons = styled(Button)<ButtonProps>((c) => ({
  //   color: c,
  //   backgroundColor: alpha(c, 0.1),
  //   display: 'block',
  //   marginBottom: 2,
  //   // '&:hover': {
  //   //   backgroundColor: purple[700],
  //   // },
  // }));

  return (
    <div>
    <Layout style={{ background: '#ffffff'}}>
      <Content>
        <Plot data = {data} config={{displayModeBar:false}} layout={{xaxis:{title: "Average Stress Level"}}} />
      </Content>
      <Sider style={{ background: '#ffffff', paddingLeft:20}}>
        <div style={{display: 'block', marginBottom: 10,paddingBottom: 2, fontSize: '16px',}}>Highlight By Category</div>
        {/* <ButtonTitle></ButtonTitle> */}
        {/* <CustomButton c = {theme.colors.socialMedia}>Social Media</CustomButton> */}
          <Button sx={{ marginBottom:1, display:'block', color: theme.colors.socialMedia, backgroundColor: alpha(theme.colors.socialMedia, 0.1) }} variant="text">Social Media</Button>
          <Button sx={{ marginBottom:1,  display:'block', color: theme.colors.game, backgroundColor: alpha(theme.colors.game, 0.1) }} variant="text">Game</Button>
          <Button sx={{ marginBottom:1,  display:'block', color: theme.colors.communicationWriting, backgroundColor: alpha(theme.colors.communicationWriting, 0.1) }} variant="text">Messenger</Button>
          <Button sx={{ marginBottom:1,  display:'block', color: theme.colors.videoStreaming, backgroundColor: alpha(theme.colors.videoStreaming, 0.1) }} variant="text">Video Streaming</Button>
          <Button sx={{ marginBottom:1, display:'block', color: theme.colors.utility, backgroundColor: alpha(theme.colors.utility, 0.1) }} variant="text">Utility</Button>
          <Button sx={{ marginBottom:1, display:'block', color: theme.colors.etc, backgroundColor: alpha(theme.colors.etc, 0.1) }} variant="text">Etc</Button>
      </Sider>
    </Layout>
      
    </div>
  );
};

// const CustomButton = styled(Layout.Content)`
//   color: c,
//   backgroundColor: alpha(c, 0.1),
//   display: 'block',
//   marginBottom: 2,
// `;

const ButtonTitle = styled(Layout.Content)`
  display: 'block',
  marginBottom: 2,
  paddingBottom: 2,
  font-size: 16px,
`;


export default Dashboard2;
