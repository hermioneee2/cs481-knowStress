import React, {useState, useEffect, useRef } from "react";
import {theme} from '../styles/Theme'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryScatter, VictoryLabel} from 'victory';

const CustomBarChart = ({ category }) => {
    let data, userX, userY;
    userX = 0;
    userY = 3.44;
  
    if (category === "Age") {
      data = [
        { x: "15-19", y: 2.63 },
        { x: "20-24", y: 2.74 },
        { x: "25-29", y: 2.88 },
        { x: "30-34", y: 2.82 },
        { x: "35-39", y: 0 },
        { x: "40-44", y: 3.43 },
        { x: "45-49", y: 0 },
        { x: "50-54", y: 0 },
        { x: "55-59", y: 0 },
        { x: "60-64", y: 0 },
      ];
      userX = 2;
    } else if (category === "Total App Usage") {
        data=[
            { x: '0-9', y: 3.12},
            { x: '10-19', y: 2.71},
            { x: '20-29', y: 2.62},
            { x: '30-39', y: 2.74},
            { x: '40-49', y: 3.33},
            { x: '50-59', y: 2.68},
            { x: '60-69', y: 2.75},
            { x: '70-79', y: 2.20},
            { x: '80-89', y: 2.91},
            { x: '90-99', y: 2.88}
        ];
        userX=3;
    }
    else if (category==="Movement"){
        data=[
            { x: '0-9', y: 2.82},
            { x: '10-19', y: 2.80},
            { x: '20-29', y: 2.61},
            { x: '30-39', y: 2.64},
            { x: '40-49', y: 2.99},
            { x: '50-59', y: 2.50},
            { x: '60-69', y: 3.31},
            { x: '70-79', y: 2.66},
            { x: '80-89', y: 2.36},
            { x: '90-99', y: 3.30}
        ];
        userX=1;
    }
    else if (category==="Sleep Time"){
        //not exist yet, fake data
        data=[
            { x: '0-9', y: 3.71},
            { x: '10-19', y: 3.04},
            { x: '20-29', y: 2.96},
            { x: '30-39', y: 3.11},
            { x: '40-49', y: 2.76},
            { x: '50-59', y: 2.50},
            { x: '60-69', y: 2.21},
            { x: '70-79', y: 2.46},
            { x: '80-89', y: 2.66},
            { x: '90-99', y: 3.31}
        ];
        userX=3;
    }
    else if (category==="Social Media"){
        data=[
            { x: '0-9', y: 2.97},
            { x: '10-19', y: 3.29},
            { x: '20-29', y: 2.88},
            { x: '30-39', y: 2.96},
            { x: '40-49', y: 3.10},
            { x: '50-59', y: 2.52},
            { x: '60-69', y: 2.90},
            { x: '70-79', y: 2.25},
            { x: '80-89', y: 2.43},
            { x: '90-99', y: 2.98}
        ];
        userX=4;
    }
    else if (category==="Game"){
        data=[
            { x: '0-9', y: 2.75},
            { x: '10-19', y: 2.58},
            { x: '20-29', y: 2.88},
            { x: '30-39', y: 3.03},
            { x: '40-49', y: 2.53},
            { x: '50-59', y: 2.50},
            { x: '60-69', y: 3.00},
            { x: '70-79', y: 2.70},
            { x: '80-89', y: 3.17},
            { x: '90-99', y: 2.87}
        ];
        userX=1;
    }
    else if (category==="Messenger"){
        data=[
            { x: '0-9', y: 2.80},
            { x: '10-19', y: 2.80},
            { x: '20-29', y: 2.62},
            { x: '30-39', y: 3.03},
            { x: '40-49', y: 2.99},
            { x: '50-59', y: 2.58},
            { x: '60-69', y: 2.83},
            { x: '70-79', y: 2.58},
            { x: '80-89', y: 3.19},
            { x: '90-99', y: 2.56}
        ];
        userX=6;
    }
    else if (category==="Video/Contents"){
        data=[
            { x: '0-9', y: 2.46},
            { x: '10-19', y: 3.33},
            { x: '20-29', y: 3.14},
            { x: '30-39', y: 2.80},
            { x: '40-49', y: 2.92},
            { x: '50-59', y: 2.83},
            { x: '60-69', y: 2.64},
            { x: '70-79', y: 2.36},
            { x: '80-89', y: 2.87},
            { x: '90-99', y: 2.66}
        ];
        userX=4;
    }
    else if (category==="Browser"){
        //not exist yet, fake data
        data=[
            { x: '0-9', y: 3.71},
            { x: '10-19', y: 3.04},
            { x: '20-29', y: 2.96},
            { x: '30-39', y: 3.11},
            { x: '40-49', y: 2.76},
            { x: '50-59', y: 2.50},
            { x: '60-69', y: 2.21},
            { x: '70-79', y: 2.46},
            { x: '80-89', y: 2.66},
            { x: '90-99', y: 3.31}
        ];
        userX=5;
    }
    else if (category==="Utility"){
        data=[
            { x: '0-9', y: 2.47},
            { x: '10-19', y: 2.62},
            { x: '20-29', y: 3.07},
            { x: '30-39', y: 2.97},
            { x: '40-49', y: 2.91},
            { x: '50-59', y: 2.82},
            { x: '60-69', y: 2.86},
            { x: '70-79', y: 2.80},
            { x: '80-89', y: 2.83},
            { x: '90-99', y: 2.69}
        ];
        userX=6;
    }
    else{
        data=[
            { x: '0-9', y: 0},
            { x: '10-19', y: 0},
            { x: '20-29', y: 0},
            { x: '30-39', y: 0},
            { x: '40-49', y: 0},
            { x: '50-59', y: 0},
            { x: '60-69', y: 0},
            { x: '70-79', y: 0},
            { x: '80-89', y: 0},
            { x: '90-99', y: 0}
        ];
        userX=-1;
    };

    return (
      <VictoryChart
        responsive={false}
        width={500}
        animate={{
          duration: 1000,
          onLoad: { duration: 200 },
        }}
        theme={VictoryTheme.material}
        domainPadding={30}
        padding={{left:30, top:0, right:30, bottom:100}}
      >
        <VictoryAxis
            dependentAxis
            domain={[0,7]}
            tickCount={8}
            style={{ 
                axis: { strokeWidth: 1 }, 
                tickLabels: { fontSize: 10 }, 
            }}
        />
        <VictoryAxis/>
        <VictoryBar
          barRatio={1}
          style={{ data: { fill: theme.colors.stress2 } }}
          alignment="middle"
          data={data}
        />
        {userX&&(<VictoryScatter
            data={[{x:userX, y:userY}]}
            size={5 }
            style={{data:{fill:theme.colors.me, stroke:'while', strokeWidth:1}}}
            labels = {({datum})=>((userX>0)?"me":"")}
            labelComponent={<VictoryLabel dy={-15} />}
            symbol="star"/>)}
      </VictoryChart>
    )
  };
export default CustomBarChart