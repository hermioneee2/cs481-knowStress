import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import {theme} from '../styles/Theme'
import StressCode from "../dashboardMinor/StressCode";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SquareIcon from '@mui/icons-material/Square';
const {Content, Sider } = Layout;



const Dashboard1 = () => {

  const dailyValues = [0, 1, 3, 4, 5, 6, 5]
  var titleStyle = {
    marginBottom: 10,
    // fontWeight: 'bold',
    fontSize: '15px',
    display: 'block',
  };

  var WeeklyText = {
    color : theme.colors.stress3,
    fontSize: '40px',
    fontWeight: 'bold',
  }

  const Daily = dailyValues.map((item) => (
    // <li key={item.id}>{item.name}</li>
    <div style={{display: 'block'}}>
      <SquareIcon sx={{color: theme.colors["stress" + item]}} />
    </div>
    
  ));

  // const Daily = dailyValues.map((v, i) => (
  //   <div key={i} className="row">
  //     {v.map((value, j) => (
  //       <div
  //         key={j}
  //         className="cell"
  //         style={{
  //           backgroundColor: colors[Math.floor((value / max) * colors.length)]
  //         }}
  //       />
  //     ))}
    // </div>

  return (
    <Layout style={{ background: '#ffffff'}}>

      <Sider style={{ background: '#ffffff', paddingLeft:20}}>
        {/* <TitleStyle>Weekly</TitleStyle> */}
        <text style={titleStyle}>Weekly</text>
        <text style={WeeklyText}>4.3</text>
      </Sider>

      <Sider style={{ background: '#ffffff', paddingLeft:20}}>
        <TitleStyle>Daily</TitleStyle>
        <div style={{display: 'block', marginTop: 10}}>
        {Daily}
          {/* <SquareIcon sx={{color: theme.colors.stress3}} /> */}
        </div>
      </Sider>

      <Content>
        {/* <TitleStyle>Hourly</TitleStyle> */}
        <text style={titleStyle}>Hourly</text>
        <SquareIcon sx={{color: theme.colors.stress3}} />
      </Content>

      <Sider style={{ background: '#ffffff', paddingLeft:20}}>
        <text style={{ marginBottom: 10, fontWeight: 'bold',}}>Stress Level</text>
        <div style={{display: 'block', marginTop: 10}}>
          <StressCode color={theme.colors.stress6} t={6} lev={'Very Stressed'}/>
          <StressCode color={theme.colors.stress5} t={5}/>
          <StressCode color={theme.colors.stress4} t={4}/>
          <StressCode color={theme.colors.stress3} t={3}/>
          <StressCode color={theme.colors.stress2} t={2}/>
          <StressCode color={theme.colors.stress1} t={1}/>
          <StressCode color={theme.colors.stress0} t={0} lev={'Not Stressed'}/>
          <div style={{marginTop: 15}}>
            <HighlightOffIcon sx={{color: '#CDCDCD', width: 13, height: 13}} />
            <text style={{marginLeft: 15, fontStyle: 'italic', fontWeight: 'lighter'}}>No Data</text>
          </div>
        </div>
      </Sider>
    </Layout>
    
  );
};

const TitleStyle = styled.text`
  marginBottom: 10;
  fontSize: '15px';
  display: 'block';
`
;


export default Dashboard1;


// https://codesandbox.io/s/zkhno9?file=/app/main.jsx