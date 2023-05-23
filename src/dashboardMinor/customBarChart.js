import React from "react";
import {theme} from '../styles/Theme'
import { 
    VictoryBar, VictoryChart, VictoryAxis, 
    VictoryTheme, VictoryScatter, VictoryLabel, VictoryTooltip,
} from 'victory';

function getTooltipText(category, range, percentile, stressLevel) {
    const usageTimeText = `${category}\n${range}\n`;
    const percentileText = (percentile | percentile===0)? `(Top ${percentile} ~ ${percentile + 10} %)\n　\n` : "　\n";
    const stressLevelText = `Average Stress Level\n${stressLevel}`;

    console.log(usageTimeText);
    console.log(percentileText);
    console.log(stressLevelText);
  
    return `${usageTimeText}${percentileText}${stressLevelText}`;
}

const CustomBarChart = ({ category }) => {
    let data, userX, userY, labelText1, labelText2, isnull;
    userX = 0;
    userY = 3.44;
    labelText1 = "Least Usage";
    labelText2 = "Most Usage";
    isnull=false;
    if (category === "Total App Usage") {
        data=[
            { x: 'Top\n1%', y: 3.12, range: "1hr 26min ~ 2hr 26min", percent: 0, category: category},
            { x: 'Top\n10%', y: 2.71, range: "2hr 30min ~ 2hr 56min", percent: 10, category: category},
            { x: 'Top\n20%', y: 2.62, range: "3hr 14min ~ 3hr 42min", percent: 20, category: category},
            { x: 'Top\n30%', y: 2.74, range: "3hr 44min ~ 4hr 05min", percent: 30, category: category},
            { x: 'Top\n40%', y: 3.33, range: "4hr 08min ~ 4hr 54min", percent: 40, category: category},
            { x: 'Top\n50%', y: 2.68, range: "4hr 56min ~ 5hr 29min", percent: 50, category: category},
            { x: 'Top\n60%', y: 2.75, range: "5hr 32min ~ 6hr 00min", percent: 60, category: category},
            { x: 'Top\n70%', y: 2.20, range: "6hr 06min ~ 6hr 47min", percent: 70, category: category},
            { x: 'Top\n80%', y: 2.91, range: "6hr 50min ~ 7hr 15min", percent: 80, category: category},
            { x: 'Top\n90%', y: 2.88, range: "7hr 16min ~ 14hr 28min", percent: 90, category: category},
            { x: 'Top\n100%',y: 0, range: ""}
        ];
        userX=3;
    }
    else if (category==="Movement"){
        data=[
            { x: 'Top\n1%', y: 2.82, range: "1hr 33min ~ 3hr 54min", percent: 0, category: category},
            { x: 'Top\n10%', y: 2.80, range: "4hr 10min ~ 5hr 15min", percent: 10, category: category},
            { x: 'Top\n20%', y: 2.61, range: "5hr 18min ~ 6hr 07min", percent: 20, category: category},
            { x: 'Top\n30%', y: 2.64, range: "6hr 11min ~ 6hr 26min", percent: 30, category: category},
            { x: 'Top\n40%', y: 2.99, range: "6hr 29min ~ 6hr 45min", percent: 40, category: category},
            { x: 'Top\n50%', y: 2.50, range: "6hr 53min ~ 7hr 17min", percent: 50, category: category},
            { x: 'Top\n60%', y: 3.31, range: "7hr 17min ~ 7hr 35min", percent: 60, category: category},
            { x: 'Top\n70%', y: 2.66, range: "7hr 36min ~ 8hr 48min", percent: 70, category: category},
            { x: 'Top\n80%', y: 2.36, range: "8hr 49min ~ 9hr 34min", percent: 80, category: category},
            { x: 'Top\n90%', y: 3.30, range: "9hr 42min ~ 15hr 04min", percent: 90, category: category},
            { x: 'Top\n100%',y: 0}
        ];
        userX=1;
        labelText1 = "Least Activity";
        labelText2 = "Most Activity";
    }
    else if (category==="Sleep Time"){
        //not exist yet, fake data
        data=[
            { x: 'Top\n1%', y: 3.71, range: "4hr 38min ~ 5hr 01min", percent: 0, category: category},
            { x: 'Top\n10%', y: 3.04, range: "5hr 05min ~ 5hr 54min", percent: 10, category: category},
            { x: 'Top\n20%', y: 2.96, range: "6hr 03min ~ 6hr 31min", percent: 20, category: category},
            { x: 'Top\n30%', y: 3.11, range: "6hr 33min ~ 6hr 57min", percent: 30, category: category},
            { x: 'Top\n40%', y: 2.76, range: "6hr 59min ~ 7hr 12min", percent: 40, category: category},
            { x: 'Top\n50%', y: 2.50, range: "7hr 15min ~ 7hr 49min", percent: 50, category: category},
            { x: 'Top\n60%', y: 2.21, range: "7hr 50min ~ 8hr 02min", percent: 60, category: category},
            { x: 'Top\n70%', y: 2.46, range: "8hr 05min ~ 8hr 41min", percent: 70, category: category},
            { x: 'Top\n80%', y: 2.66, range: "8hr 50min ~ 9hr 27min", percent: 80, category: category},
            { x: 'Top\n90%', y: 3.31, range: "9hr 33min ~ 10hr 54min", percent: 90, category: category},
            { x: 'Top\n100%',y: 0}
        ];
        userX=3;
        labelText1 = "Least Sleep";
        labelText2 = "Most Sleep";
    }
    else if (category==="Social Media"){
        data=[
            { x: 'Top\n1%', y: 2.97, range: "0hr 00min ~ 0hr 02min", percent: 0, category: `${category} Usage`},
            { x: 'Top\n10%', y: 3.29, range: "0hr 02min ~ 0hr 06min", percent: 10, category: `${category} Usage`},
            { x: 'Top\n20%', y: 2.88, range: "0hr 07min ~ 0hr 11min", percent: 20, category: `${category} Usage`},
            { x: 'Top\n30%', y: 2.96, range: "0hr 12min ~ 0hr 25min", percent: 30, category: `${category} Usage`},
            { x: 'Top\n40%', y: 3.10, range: "0hr 26min ~ 0hr 28min", percent: 40, category: `${category} Usage`},
            { x: 'Top\n50%', y: 2.52, range: "0hr 31min ~ 0hr 45min", percent: 50, category: `${category} Usage`},
            { x: 'Top\n60%', y: 2.90, range: "0hr 47min ~ 1hr 14min", percent: 60, category: `${category} Usage`},
            { x: 'Top\n70%', y: 2.25, range: "1hr 14min ~ 1hr 34min", percent: 70, category: `${category} Usage`},
            { x: 'Top\n80%', y: 2.43, range: "1hr 35min ~ 1hr 56min", percent: 80, category: `${category} Usage`},
            { x: 'Top\n90%', y: 2.98, range: "2hr 00min ~ 4hr 51min", percent: 90, category: `${category} Usage`},
            { x: 'Top\n100%',y: 0}
        ];
        userX=4;
    }
    else if (category==="Game"){
        data=[
            { x: 'Top\n1%', y: 2.75, range: "0hr 06min ~ 0hr 01min", percent: 0, category: `${category} Usage`},
            { x: 'Top\n10%', y: 2.58, range: "0hr 25min ~ 0hr 01min", percent: 10, category: `${category} Usage`},
            { x: 'Top\n20%', y: 2.88, range: "0hr 31min ~ 0hr 01min", percent: 20, category: `${category} Usage`},
            { x: 'Top\n30%', y: 3.03, range: "0hr 38min ~ 0hr 01min", percent: 30, category: `${category} Usage`},
            { x: 'Top\n40%', y: 2.53, range: "0hr 43min ~ 0hr 01min", percent: 40, category: `${category} Usage`},
            { x: 'Top\n50%', y: 2.50, range: "0hr 46min ~ 0hr 01min", percent: 50, category: `${category} Usage`},
            { x: 'Top\n60%', y: 3.00, range: "0hr 57min ~ 1hr 01min", percent: 60, category: `${category} Usage`},
            { x: 'Top\n70%', y: 2.70, range: "1hr 23min ~ 2hr 01min", percent: 70, category: `${category} Usage`},
            { x: 'Top\n80%', y: 3.17, range: "2hr 23min ~ 6hr 01min", percent: 80, category: `${category} Usage`},
            { x: 'Top\n90%', y: 2.87, range: "6hr 48min ~ 7hr 23min", percent: 90, category: `${category} Usage`},
            { x: 'Top\n100%',y: 0}
        ];
        userX=1;
    }
    else if (category==="Messenger"){
        data=[
            { x: 'Top\n1%', y: 2.80, range: "0hr 05min ~ 0hr 20min", percent: 0, category: `${category} Usage`},
            { x: 'Top\n10%', y: 2.80, range: "0hr 21min ~ 0hr 31min", percent: 10, category: `${category} Usage`},
            { x: 'Top\n20%', y: 2.62, range: "0hr 31min ~ 0hr 44min", percent: 20, category: `${category} Usage`},
            { x: 'Top\n30%', y: 3.03, range: "0hr 44min ~ 0hr 56min", percent: 30, category: `${category} Usage`},
            { x: 'Top\n40%', y: 2.99, range: "1hr 00min ~ 1hr 03min", percent: 40, category: `${category} Usage`},
            { x: 'Top\n50%', y: 2.58, range: "1hr 04min ~ 1hr 13min", percent: 50, category: `${category} Usage`},
            { x: 'Top\n60%', y: 2.83, range: "1hr 15min ~ 1hr 31min", percent: 60, category: `${category} Usage`},
            { x: 'Top\n70%', y: 2.58, range: "1hr 31min ~ 1hr 52min", percent: 70, category: `${category} Usage`},
            { x: 'Top\n80%', y: 3.19, range: "1hr 55min ~ 2hr 28min", percent: 80, category: `${category} Usage`},
            { x: 'Top\n90%', y: 2.56, range: "2hr 38min ~ 4hr 51min", percent: 90, category: `${category} Usage`},
            { x: 'Top\n100%',y: 0}
        ];
        userX=6;
    }
    else if (category==="Video/Contents"){
        data=[
            { x: 'Top\n1%', y: 2.46, range: "0hr 00min ~ 0hr 02min", percent: 0, category: `${category} Usage`},
            { x: 'Top\n10%', y: 3.33, range: "0hr 02min ~ 0hr 09min", percent: 10, category: `${category} Usage`},
            { x: 'Top\n20%', y: 3.14, range: "0hr 09min ~ 0hr 26min", percent: 20, category: `${category} Usage`},
            { x: 'Top\n30%', y: 2.80, range: "0hr 27min ~ 0hr 41min", percent: 30, category: `${category} Usage`},
            { x: 'Top\n40%', y: 2.92, range: "0hr 43min ~ 1hr 01min", percent: 40, category: `${category} Usage`},
            { x: 'Top\n50%', y: 2.83, range: "1hr 02min ~ 1hr 28min", percent: 50, category: `${category} Usage`},
            { x: 'Top\n60%', y: 2.64, range: "1hr 34min ~ 2hr 24min", percent: 60, category: `${category} Usage`},
            { x: 'Top\n70%', y: 2.36, range: "2hr 24min ~ 3hr 04min", percent: 70, category: `${category} Usage`},
            { x: 'Top\n80%', y: 2.87, range: "3hr 11min ~ 4hr 19min", percent: 80, category: `${category} Usage`},
            { x: 'Top\n90%', y: 2.66, range: "5hr 05min ~ 6hr 53min", percent: 90, category: `${category} Usage`},
            { x: 'Top\n100%',y: 0}
        ];
        userX=4;
    }
    else if (category==="Browser"){
        //not exist yet, fake data
        data=[
            { x: 'Top\n1%', y: 3.71, range: "0hr 00min ~ 0hr 02min", percent: 0, category: `${category} Usage`},
            { x: 'Top\n10%', y: 3.04, range: "0hr 02min ~ 0hr 09min", percent: 10, category: `${category} Usage`},
            { x: 'Top\n20%', y: 2.96, range: "0hr 09min ~ 0hr 26min", percent: 20, category: `${category} Usage`},
            { x: 'Top\n30%', y: 3.11, range: "0hr 27min ~ 0hr 41min", percent: 30, category: `${category} Usage`},
            { x: 'Top\n40%', y: 2.76, range: "0hr 43min ~ 1hr 01min", percent: 40, category: `${category} Usage`},
            { x: 'Top\n50%', y: 2.50, range: "1hr 02min ~ 1hr 28min", percent: 50, category: `${category} Usage`},
            { x: 'Top\n60%', y: 2.21, range: "1hr 34min ~ 2hr 24min", percent: 60, category: `${category} Usage`},
            { x: 'Top\n70%', y: 2.46, range: "2hr 24min ~ 3hr 04min", percent: 70, category: `${category} Usage`},
            { x: 'Top\n80%', y: 2.66, range: "3hr 11min ~ 4hr 19min", percent: 80, category: `${category} Usage`},
            { x: 'Top\n90%', y: 3.31, range: "5hr 05min ~ 6hr 53min", percent: 90, category: `${category} Usage`},
            { x: 'Top\n100%',y: 0}
        ];
        userX=5;
    }
    else if (category==="Utility"){
        data=[
            { x: 'Top\n1%', y: 2.47, range: "0hr 42min ~ 1hr 03min", percent: 0, category: `${category} Usage`},
            { x: 'Top\n10%', y: 2.62, range: "1hr 08min ~ 1hr 25min", percent: 10, category: `${category} Usage`},
            { x: 'Top\n20%', y: 3.07, range: "1hr 28min ~ 1hr 50min", percent: 20, category: `${category} Usage`},
            { x: 'Top\n30%', y: 2.97, range: "1hr 51min ~ 2hr 00min", percent: 30, category: `${category} Usage`},
            { x: 'Top\n40%', y: 2.91, range: "2hr 04min ~ 2hr 20min", percent: 40, category: `${category} Usage`},
            { x: 'Top\n50%', y: 2.82, range: "2hr 24min ~ 2hr 37min", percent: 50, category: `${category} Usage`},
            { x: 'Top\n60%', y: 2.86, range: "2hr 39min ~ 2hr 57min", percent: 60, category: `${category} Usage`},
            { x: 'Top\n70%', y: 2.80, range: "2hr 58min ~ 3hr 27min", percent: 70, category: `${category} Usage`},
            { x: 'Top\n80%', y: 2.83, range: "3hr 28min ~ 4hr 37min", percent: 80, category: `${category} Usage`},
            { x: 'Top\n90%', y: 2.69, range: "6hr 05min ~ 11hr 23min", percent: 90, category: `${category} Usage`},
            { x: 'Top\n100%',y: 0}
        ];
        userX=6;
    }
    else{
        category="Age";
        data = [
          { x: "15", y: 2.63, range: "15 ~ 19", category: category},
          { x: "20", y: 2.74, range: "20 ~ 24", category: category},
          { x: "25", y: 2.88, range: "25 ~ 29", category: category},
          { x: "30", y: 2.82, range: "30 ~ 34", category: category},
          { x: "35", y: 0 , range: "35 ~ 39", category: category},
          { x: "40", y: 3.43 , range: "40 ~ 44", category: category},
          { x: "45", y: 0 , range: "45 ~ 49", category: category},
          { x: "50", y: 0 , range: "50 ~ 54", category: category},
        //   { x: "55", y: 0 , range: "55 ~ 59", category: category},
        //   { x: "60", y: 0, range: "60 ~ 64" , category: category},
        //   { x: "65", y: 0, range: "65 ~ 69", category: category},
        ];
        userX = 2;
        labelText1 = "";
        labelText2 = "";
      }
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
    const XTick = category === "Age"
    ? [15, 20, 25, 30, 35, 40, 45, 50]
    : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            
    return (!isnull)&&(
      <VictoryChart
        responsive={false}
        width = {500}
        theme={VictoryTheme.material}
        domainPadding={{x:[30, 30], y:[5, 5]}}
        padding={{left:120, top:0, right:20, bottom:0}}
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
            tickFormat={(tick)=>tick}
            tickLabelComponent={<VictoryLabel style={{fontFamily: 'Open Sans', fontStyle:'normal', fontWeight:300, fill:theme.colors.blackKS, size:'10px'}}/>}
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
                tickLabels: {fontWeight: 300, fontFamily: "Open Sans"},
                grid: {stroke: "transparent"},
                axis: {stroke: "transparent"},
            }}
        />
        <VictoryBar
          barRatio={category==="Age"?1.15:1.05}
          style={{ 
            labels: {
                fill: "white",
                fontFamily: "Open Sans",
                fontSize: 10,
                backgroundColor: "black"
              },
            data: { fill: theme.colors.stress2},
        }}
          alignment="start"
          labelComponent={<VictoryTooltip
            flyoutStyle={{fill: "black", opacity:0.8}}
            flyoutPadding={({ text }) =>
            text.length > 1
              ? { top: 3, bottom: 3, left: 7, right: 7 }
              : 7}
            pointerOrientation="bottom"
            dx={13}
            textAnchor="start"
            style = {{textAnchor: "start", fill:"white", fontFamily: "open Sans", fontSize: 20, fontweight:500, fontStyle:'bold'}}
            />
        }
            labels={({ datum }) => String(getTooltipText(datum.category, datum.range, datum.percent, datum.y))}
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
        y={400}
        text={labelText1}
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'10px'}}
        />
        <VictoryLabel
        x={400}
        y={400}
        text={labelText2}
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'10px'}}
        /> 

        <VictoryLabel
        x={10}
        y={-20}
        text='Very Stressed'
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'10px'}}
        />         
        <VictoryLabel
        x={30}
        y={350}
        text='No Stress'
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'10px'}}
        /> 
        <div style={{marginBottom: '10px'}}></div>
      </VictoryChart>
      
    )
  };



export default CustomBarChart
