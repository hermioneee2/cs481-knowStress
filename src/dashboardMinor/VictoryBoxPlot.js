import React from 'react';
import { 
    VictoryBoxPlot, VictoryChart, VictoryAxis, 
    VictoryTheme, VictoryScatter, VictoryLabel,VictoryLine,
} from 'victory';
import {theme} from '../styles/Theme';
import { alpha } from "@mui/material";





const BoxPlotWithLine = () => {

    const yLabels = [0,1,2,3,4,5,6];
    const data = [
        { x: 1, y: [1, 2, 3, 5] },
    ];

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
        return <circle cx={props.x1} cy={props.y1} r={'1px'} fill={stressColor}/>
    }
    
  return (
    <VictoryChart
        // responsive={false}
        width={100}
        height={100}
        theme={VictoryTheme.material}
        padding={{left:25, top:10, right:3, bottom:10}}
    >
        {yLabels.map((label) => (
        <VictoryLine
            key={label}
            data={[{ x: 0, y: label }, { x: 2, y: label }]}
            style={{ data: { stroke: theme.colors.grayKS, strokeWidth: 0.1 } }}
        />
        ))}

        {/* 가운데 라인 + 레이블 */}
        <VictoryLine
            data={[{ x: 0, y: 4.2 }, { x: 2, y: 4.2 }]}
            style={{ data: { stroke: theme.colors.me, strokeWidth: 1, strokeDasharray: '3, 1' } }}
        />
        <VictoryLabel
            x={80}
            y={ 4.2 * 10 - 12}
            text= {4.2}
            textAnchor="start"
            style={{fontFamily: 'Open Sans', fontWeight:600, fill:theme.colors.me, fontSize:5}}
        />    

        {/* y축 */}
        <defs>
            <linearGradient
                id="YGradient"
                y1="0%"
                y2="100%"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor={theme.colors.stress5} />
                <stop offset="50%" stopColor={theme.colors.stress2} />
                <stop offset="80%" stopColor={theme.colors.stress0} />
            </linearGradient>
        </defs>
        <VictoryAxis
            dependentAxis
            domain={[0,6]}
            domainPadding={0}
            tickValues={[0,1,2,3,4,5,6]}
            tickComponent={<CircleTick/>}
            tickFormat={(tick)=>tick}
            tickLabelComponent={<VictoryLabel dx={10}  textAnchor="middle" style={{ fontWeight:300, color:theme.colors.grayKS, fontSize:'3px', paddingRight:0 }}/>}
            style={{ 
                grid: {stroke: "transparent", strokeWidth:2},
                axis: {dx:3, stroke: "url(#YGradient)"}
            }}
        />
        
         <VictoryLabel
            x={0}
            y={10}
            text='Very Stressed'
            style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, fontSize:2.5}}
        />         
        <VictoryLabel
            x={0}
            y={90}
            text='No Stress'
            style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, fontSize:2.5}}
        /> 
        <VictoryBoxPlot
            boxWidth={15}
            data={data}
            style={{
                q1: { fill: "white", stroke:'black' },
                q3: { fill: "white", stroke:'black' },
            }}
            medianLabels
            medianLabelComponent={<VictoryLabel  dx={9} dy={3} style={{fontSize: '4px'}}/>}

            minLabels
            minLabelComponent={<VictoryLabel  dx={9} dy={3} style={{fontSize: '4px'}}/>}

            q1Labels
            q1LabelComponent={<VictoryLabel  dx={9} dy={3} style={{fontSize: '4px'}}/>}

            q3Labels
            q3LabelComponent={<VictoryLabel  dx={9} dy={3} style={{fontSize: '4px'}}/>}

            maxLabels
            maxLabelComponent={<VictoryLabel dx={9} dy={3}  style={{fontSize: '4px'}} /> }
           
        />
        

    </VictoryChart>
  );
};

export default BoxPlotWithLine;