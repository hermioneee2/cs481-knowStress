import React from "react";
import { Layout } from "antd";
import {theme} from '../styles/Theme'
import StressCode from "../dashboardMinor/StressCode";
import styled from "styled-components";
import { Tooltip } from 'antd';


import SquareIcon from '@mui/icons-material/Square';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import { getColor } from "../dashboardMinor/GetColor";
const {Content, Sider } = Layout;



const Dashboard1 = () => {

  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyValues = 3.4;
  const dailyValues = [4.454545454545454,4.076923076923077,3.5,3.8181818181818183,3.8181818181818183,1.2727272727272727,2.8];
  const hourlyValues = [
    [2.0,5.0,-1,3.0,4.0,6.0,-1,6.0,3.0,6.0,-1,3.0 ],
    [3.0,-1,3.0,6.0,5.0,6.0,5.5,3.0,2.5,-1,2.0,-1],
    [5.0,-1,4.0,-1,-1,2.0,3.6666666666666665,4.0,2.0,5.0,-1,-1],
    [3.0,3.0,-1,5.5,6.0,-1,3.0,4.0,-1,2.5,4.0,3.0],
    [1.5,-1,2.5,-1,4.0,6.0,4.0,-1,3.0,6.0,6.0,5.0],
    [0.5,0.0,3.0,0.0,0.0,-1,3.0,3.0,0.0,3.0,-1,1.0],
    [2.0,2.0,2.0,3.0,4.0,2.0,2.0,3.0,4.0,-1,-1,-1],
  ];


  var WeeklyText = {
    color : getColor(weeklyValues),
    fontSize: '40px',
    fontWeight: 'bold',
  };

  var yLabel = {
    color: theme.colors.grayKS,
    fontWeight: 'lighter',
    fontSize: '12px',
    width: 10,
    // paddingTop: 2,
    marginTop: 3,
    marginRight: 25,
  };

  const Daily = dailyValues.map((item) => (
    <div key={item.id} style={{display: 'block'}}>
      <Tooltip title={item.toFixed(2)}>
        <SquareIcon fontSize={'inherit'} sx={{color: getColor(item), margin:-0.3, marginTop:-0.7, fontSize:'30px'}} />
      </Tooltip>
    </div>
    
  ));

  const Hourly = hourlyValues.map((v, i) => (
    <div key={i} className="row" style={{display: 'flex'}}>
      <text style={yLabel}>{days[i]}</text>
      {v.map((value, j) => (
        <div style={{display: 'block'}} key={j}>
          {value === -1 ? 
          <DisabledByDefaultIcon fontSize={'inherit'}  sx={{color: '#CDCDCD', margin:-0.3,marginTop:-0.7, fontSize:'30px'}}/> 
          : 
          <div>
             <Tooltip title={value.toFixed(1)}>
              <SquareIcon fontSize={'inherit'} sx={{color: getColor(value), margin:-0.3, marginTop:-0.7, fontSize:'30px'}} />
             </Tooltip>
          </div>
           }
        </div>
      ))}
    </div>
  ));

  return (
    <Layout style={{ background: '#ffffff'}}>

      <Sider width={'20%'} style={{ background: '#ffffff'}}>
        <TitleStyle>Weekly</TitleStyle>
        <text style={WeeklyText}>{weeklyValues}</text>

      </Sider>

      <Sider width={'5%'} style={{ background: '#ffffff'}}>
        <TitleStyle>Daily</TitleStyle>
        <div style={{display: 'block', marginTop: 10}}>{Daily}</div>
      </Sider>

      <Content width={'55%'}>
        <TitleStyle style={{marginLeft: 35}}>Hourly</TitleStyle>
        <div style={{display: 'block', marginTop: 10}}>{Hourly}</div>
        <div style={{paddingLeft: 25}}>
          <XLabel>10AM</XLabel>
          <XLabel>12PM</XLabel>
          <XLabel>2PM</XLabel>
          <XLabel>4PM</XLabel>
          <XLabel>6PM</XLabel>
          <XLabel>8PM</XLabel>
          <XLabel>10PM</XLabel>
          
        </div>
        <div style={{marginBottom: 30}}/>
        
        
        
      </Content>

      <Sider width={'20%'} style={{ background: '#ffffff', paddingLeft:20, marginTop:25}}>
        <StressLevel>Stress Level</StressLevel>
        <div style={{display: 'block', marginTop: 10}}>
          <StressCode color={theme.colors.stress6} t={6} lev={'Very Stressed'}/>
          <StressCode color={theme.colors.stress5} t={5}/>
          <StressCode color={theme.colors.stress4} t={4}/>
          <StressCode color={theme.colors.stress3} t={3}/>
          <StressCode color={theme.colors.stress2} t={2}/>
          <StressCode color={theme.colors.stress1} t={1}/>
          <StressCode color={theme.colors.stress0} t={0} lev={'Not Stressed'}/>
          <StressCode v={-1} lev={'No Data'}/>
        </div>
      </Sider>
    </Layout>
    
  );
};

const TitleStyle = styled(Layout.Content)`
  color: ${(props) => props.theme.colors.blackKS};
  font-family: "Open Sans";
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
`;

// const WeeklyText = styled(Layout.Content)`
//   color : ${(props) => getColor(props.Dashboard1.weeklyValues)};
//   font-size: 40px;
//   font-weight: 700;
// `;

const XLabel = styled.span`
  color: ${(props) => props.theme.colors.grayKS};
  font-size: 11px;
  font-weight: 200;
  width: 10;
  padding-right: 25;
  margin-right: 25px;
`;

const StressLevel = styled(Layout.Content)`
  color: ${(props) => props.theme.colors.blackKS};
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 5px;
`;


export default Dashboard1;

