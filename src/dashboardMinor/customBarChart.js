import React from "react";
import {theme} from '../styles/Theme'
import { Layout } from 'antd';
import styled from "styled-components";
import { 
    VictoryBar, VictoryChart, VictoryAxis, 
    VictoryTheme, VictoryScatter, VictoryLabel,
} from 'victory';

const CustomBarChart = ({ category }) => {
    let data, userX, userY, labelText1, labelText2, isnull;
    userX = 0;
    userY = 3.44;
    labelText1 = "Least Usage";
    labelText2 = "Most Usage";
    isnull=false;
    if (category === "Age") {
      data = [
        { x: "15", y: 2.63 },
        { x: "20", y: 2.74 },
        { x: "25", y: 2.88 },
        { x: "30", y: 2.82 },
        { x: "35", y: 0 },
        { x: "40", y: 3.43 },
        { x: "45", y: 0 },
        { x: "50", y: 0 },
        { x: "55", y: 0 },
        { x: "60", y: 0 },
        { x: "65", y: 0},
      ];
      userX = 2;
      labelText1 = "";
      labelText2 = "";
    } else if (category === "Total App Usage") {
        data=[
            { x: '1st', y: 3.12},
            { x: '10th', y: 2.71},
            { x: '20th', y: 2.62},
            { x: '30th', y: 2.74},
            { x: '40th', y: 3.33},
            { x: '50th', y: 2.68},
            { x: '60th', y: 2.75},
            { x: '70th', y: 2.20},
            { x: '80th', y: 2.91},
            { x: '90th', y: 2.88},
            { x: '100th',y: 0}
        ];
        userX=3;
    }
    else if (category==="Movement"){
        data=[
            { x: '1st', y: 2.82},
            { x: '10th', y: 2.80},
            { x: '20th', y: 2.61},
            { x: '30th', y: 2.64},
            { x: '40th', y: 2.99},
            { x: '50th', y: 2.50},
            { x: '60th', y: 3.31},
            { x: '70th', y: 2.66},
            { x: '80th', y: 2.36},
            { x: '90th', y: 3.30},
            { x: '100th',y: 0}
        ];
        userX=1;
        labelText1 = "Least Activity";
        labelText2 = "Most Activity";
    }
    else if (category==="Sleep Time"){
        //not exist yet, fake data
        data=[
            { x: '1st', y: 3.71},
            { x: '10th', y: 3.04},
            { x: '20th', y: 2.96},
            { x: '30th', y: 3.11},
            { x: '40th', y: 2.76},
            { x: '50th', y: 2.50},
            { x: '60th', y: 2.21},
            { x: '70th', y: 2.46},
            { x: '80th', y: 2.66},
            { x: '90th', y: 3.31},
            { x: '100th',y: 0}
        ];
        userX=3;
        labelText1 = "Least Sleep";
        labelText2 = "Most Sleep";
    }
    else if (category==="Social Media"){
        data=[
            { x: '1st', y: 2.97},
            { x: '10th', y: 3.29},
            { x: '20th', y: 2.88},
            { x: '30th', y: 2.96},
            { x: '40th', y: 3.10},
            { x: '50th', y: 2.52},
            { x: '60th', y: 2.90},
            { x: '70th', y: 2.25},
            { x: '80th', y: 2.43},
            { x: '90th', y: 2.98},
            { x: '100th',y: 0}
        ];
        userX=4;
    }
    else if (category==="Game"){
        data=[
            { x: '1st', y: 2.75},
            { x: '10th', y: 2.58},
            { x: '20th', y: 2.88},
            { x: '30th', y: 3.03},
            { x: '40th', y: 2.53},
            { x: '50th', y: 2.50},
            { x: '60th', y: 3.00},
            { x: '70th', y: 2.70},
            { x: '80th', y: 3.17},
            { x: '90th', y: 2.87},
            { x: '100th',y: 0}
        ];
        userX=1;
    }
    else if (category==="Messenger"){
        data=[
            { x: '1st', y: 2.80},
            { x: '10th', y: 2.80},
            { x: '20th', y: 2.62},
            { x: '30th', y: 3.03},
            { x: '40th', y: 2.99},
            { x: '50th', y: 2.58},
            { x: '60th', y: 2.83},
            { x: '70th', y: 2.58},
            { x: '80th', y: 3.19},
            { x: '90th', y: 2.56},
            { x: '100th',y: 0}
        ];
        userX=6;
    }
    else if (category==="Video/Contents"){
        data=[
            { x: '1st', y: 2.46},
            { x: '10th', y: 3.33},
            { x: '20th', y: 3.14},
            { x: '30th', y: 2.80},
            { x: '40th', y: 2.92},
            { x: '50th', y: 2.83},
            { x: '60th', y: 2.64},
            { x: '70th', y: 2.36},
            { x: '80th', y: 2.87},
            { x: '90th', y: 2.66},
            { x: '100th',y: 0}
        ];
        userX=4;
    }
    else if (category==="Browser"){
        //not exist yet, fake data
        data=[
            { x: '1st', y: 3.71},
            { x: '10th', y: 3.04},
            { x: '20th', y: 2.96},
            { x: '30th', y: 3.11},
            { x: '40th', y: 2.76},
            { x: '50th', y: 2.50},
            { x: '60th', y: 2.21},
            { x: '70th', y: 2.46},
            { x: '80th', y: 2.66},
            { x: '90th', y: 3.31},
            { x: '100th',y: 0}
        ];
        userX=5;
    }
    else if (category==="Utility"){
        data=[
            { x: '1st', y: 2.47},
            { x: '10th', y: 2.62},
            { x: '20th', y: 3.07},
            { x: '30th', y: 2.97},
            { x: '40th', y: 2.91},
            { x: '50th', y: 2.82},
            { x: '60th', y: 2.86},
            { x: '70th', y: 2.80},
            { x: '80th', y: 2.83},
            { x: '90th', y: 2.69},
            { x: '100th',y: 0}
        ];
        userX=6;
    }
    else{
        data=[
            { x: '1st', y: 0},
            { x: '10th', y: 0},
            { x: '20th', y: 0},
            { x: '30th', y: 0},
            { x: '40th', y: 0},
            { x: '50th', y: 0},
            { x: '60th', y: 0},
            { x: '70th', y: 0},
            { x: '80th', y: 0},
            { x: '90th', y: 0},
            { x: '100th',y: 0}
        ];
        userX=-1;
        labelText1 = "";
        labelText2 = "";
        isnull=true;
    };
    const CircleTick = (props) =>{
        let stressColor;
        if (props.index === 0) {
            stressColor = theme.colors.stress0;
        } else if (props.index === 1) {
            stressColor = theme.colors.stress1;
        } else if (props.index === 2) {
            stressColor = theme.colors.stress2;
        } else if (props.index === 3) {
            stressColor = theme.colors.stress3;
        } else if (props.index === 4) {
            stressColor = theme.colors.stress4;
        } else if (props.index === 5) {
            stressColor = theme.colors.stress5;
        } else if (props.index === 6) {
            stressColor = theme.colors.stress6;
        }
        else{
            stressColor = theme.colors.stress0;
        }
        return <circle cx={props.x1} cy={props.y1} r={'5px'} fill={stressColor}/>
    }
    const VoidTick = (props) =>{
        return <circle cx={props.x1} cy={props.y1} r={'5px'} fill={'transparent'}/>
    }
    const XTick = category === "Age"? [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65]: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            
    return (!isnull)&&(
      <VictoryChart
        responsive={false}
        width={500}
        theme={VictoryTheme.material}
        domainPadding={{x:[30, 30], y:[5, 5]}}
        padding={{left:120, top:-50, right:20, bottom:100}}
      >
        {/* y축 */}
        <defs>
        <linearGradient
            id="YGradient"
            x1="0%"
            x2="100%"
            gradientUnits="userSpaceOnUse"
        >
            <stop offset="0%" stopColor={theme.colors.stress3} />
            <stop offset="50%" stopColor={theme.colors.stress2} />
            <stop offset="100%" stopColor={theme.colors.stress1} />
        </linearGradient>
        </defs>
        <VictoryAxis
            dependentAxis
            domain={[0,6]}
            domainPadding={0}
            tickValues={[0,1,2,3,4,5,6]}
            tickComponent={<CircleTick/>}
            tickFormat={(tick)=>{
                switch (tick){
                    case 0: return "No Stress";
                    case 6: return "Very Stressed";
                    default: return "";
                }
            }}
            tickLabelComponent={<VictoryLabel style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'14px'}}/>}
            style={{ 
                grid: {stroke: "transparent"},
                tickLabels: { fontSize: 10 }, 
                axis: {dx:10, stroke: "url(#YGradient)"}
            }}
        />
        {/* x축 */}
        <VictoryAxis
            tickValues = {XTick}
            tickComponent={<VoidTick/>}

            style={{ 
                grid: {stroke: "transparent"},
                axis: {stroke: "transparent"},
            }}
        />
        <VictoryBar
          barRatio={0.9}
          style={{ 
            data: { fill: theme.colors.stress2},
        }}
          alignment="start"
          data={data}

        />
        {userX&&(<VictoryScatter
            data={[{x:userX+0.4, y:userY}]}
            size={6}
            style={{data:{fill:theme.colors.me, grid:{stroke:"transparent"}}}}
            labels = {({datum})=>((userX>0)?"me":"")}
            labelComponent={<VictoryLabel dy={-10} style = {{fontFamily: 'Open Sans', fill:theme.colors.me, size:'11px'}}/>}
            symbol="star"/>)}
        <VictoryLabel
        x={100}
        y={300}
        text={labelText1}
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'14px'}}
        />
        <VictoryLabel
        x={400}
        y={300}
        text={labelText2}
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'14px'}}
        /> 
        <div style={{marginBottom: '20px'}}></div>
      </VictoryChart>
      
    )
  };



export default CustomBarChart