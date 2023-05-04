import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import {theme} from '../styles/Theme'
import StressCode from "../dashboardMinor/StressCode";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SquareIcon from '@mui/icons-material/Square';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import { getColor } from "../dashboardMinor/Heatmap";
const {Content, Sider } = Layout;



const Dashboard1 = () => {

  const dailyValues = [3, 3.2, 3.5, 3.7, 4, 4.9, 5]
  // const dailyValues = [[3, Mon], [3.2, Tue], [3.5, 3.7, 4, 4.9, 5]
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  // var ddValues = dailyValues.map(function(e, i) {
  //   return [e, days[i]]
  // })
  const weeklyValues = 2.6
  const hourlyValues = [[3, 3.2, 3.5, 3.7, 4, 4.9, 5, 3, 2, 2, 2, 2],[-1, 3.2, 3.5, 3.7, 4, 4.9, 5, -1, 2, 2, 2, 2],[-1, 3.2, 3.5, 3.7, 4, 4.9, 5, -1, 2, 2, 2, 2],[-1, 3.2, 3.5, 3.7, 4, 4.9, 5, -1, 2, 2, 2, 2],[-1, 3.2, 3.5, 3.7, 4, 4.9, 5, -1, 2, 2, 2, 2],[-1, 3.2, 3.5, 3.7, 4, 4.9, 5, -1, 2, 2, 2, 2],[-1, 3.2, 3.5, 3.7, 4, 4.9, 5, -1, 2, 2, 2, 2]]

  var titleStyle = {
    marginBottom: 10,
    // fontWeight: 'bold',
    fontSize: '15px',
    display: 'block',
  };

  var WeeklyText = {
    color : getColor(weeklyValues),
    fontSize: '40px',
    fontWeight: 'bold',
  }

  // var axisLabel = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  // }

  var xLabel = {
    color: theme.colors.grayKS,
    fontWeight: 'lighter',
    fontSize: '11px',
    width: 10,
    paddingRight: 25,

  }

  var yLabel = {
    // display: 'flex',
    // alignItems: 'right',
    color: theme.colors.grayKS,
    fontWeight: 'lighter',
    fontSize: '11px',
    width: 10,
    // textAlign: 'right',
    paddingTop: 2,
    marginTop: 5,
    paddingRight: 35,
    // marginLeft: 5,
    // marginTop: -1,
    // paddingTop: -1,
  }

  const Daily = dailyValues.map((item) => (
    // <li key={item.id}>{item.name}</li>
    <div key={item.id} style={{display: 'block'}}>
      <SquareIcon sx={{color: getColor(item), margin:-0.3, fontSize:'30px'}} />
      {/* <text style={yLabel}>{item[1]}</text> */}
    </div>
    
  ));

  const Hourly = hourlyValues.map((v, i) => (
    <div key={i} className="row" style={{display: 'flex'}}>
      <text style={yLabel}>{days[i]}</text>
      {v.map((value, j) => (
        <div style={{display: 'block'}} key={j}>
          {value == -1 ? <DisabledByDefaultIcon sx={{color: '#CDCDCD', margin:-0.3, fontSize:'30px'}}/> : <SquareIcon sx={{color: getColor(value), margin:-0.3, fontSize:'30px'}} /> }
        </div>
      ))}
    </div>
  ));

  return (
    <Layout style={{ background: '#ffffff'}}>

      <Sider width={130} style={{ background: '#ffffff'}}>
        <text style={titleStyle}>Weekly</text>
        <text style={WeeklyText}>4.3</text>
      </Sider>

      <Sider width={60} style={{ background: '#ffffff'}}>
        <text style={titleStyle}>Daily</text>
        <div style={{display: 'block', marginTop: 10}}>{Daily}</div>
      </Sider>

      <Content>
        <text style={titleStyle}>Hourly</text>
        <div style={{display: 'block', marginTop: 10}}>{Hourly}</div>
        <div style={{paddingLeft: 25}}>
          <text style={xLabel}>10AM</text>
          <text style={xLabel}>12PM</text>
          <text style={xLabel}>2PM</text>
          <text style={xLabel}>4PM</text>
          <text style={xLabel}>6PM</text>
          <text style={xLabel}>8PM</text>
          <text style={xLabel}>10PM</text>
        </div>
        
        
        
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

// const TitleStyle = styled.text`
//   marginBottom: 10;
//   fontSize: '15px';
//   display: 'block';
// `
// ;


export default Dashboard1;


// https://codesandbox.io/s/zkhno9?file=/app/main.jsx