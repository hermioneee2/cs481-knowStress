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
    if (category==="Sleep Time"){
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
    else if (category==="Movement"){
        fetch(`https://riyuna.pythonanywhere.com/histgram?${category.toLowerCase()}`)
        .then((response) => response.json())
        .then((dt) => {
        data=[
            { x: 'Top\n1%', y: dt["0%~10%"].stress, range: `${dt["0%~10%"].mintime} ~ ${dt["0%~10%"].mintime}`, percent: 0, category: `${category}`},
            { x: 'Top\n10%', y: dt["10%~20%"].stress, range: `${dt["10%~20%"].mintime} ~ ${dt["10%~20%"].mintime}`, percent: 10, category: `${category}`},
            { x: 'Top\n20%', y: dt["20%~30%"].stress, range: `${dt["20%~30%"].mintime} ~ ${dt["20%~30%"].mintime}`, percent: 20, category: `${category}`},
            { x: 'Top\n30%', y: dt["30%~40%"].stress, range: `${dt["30%~40%"].mintime} ~ ${dt["30%~40%"].mintime}`, percent: 30, category: `${category}`},
            { x: 'Top\n40%', y: dt["40%~50%"].stress, range: `${dt["40%~50%"].mintime} ~ ${dt["40%~50%"].mintime}`, percent: 40, category: `${category}`},
            { x: 'Top\n50%', y: dt["50%~60%"].stress, range: `${dt["50%~60%"].mintime} ~ ${dt["50%~60%"].mintime}`, percent: 50, category: `${category}`},
            { x: 'Top\n60%', y: dt["60%~70%"].stress, range: `${dt["60%~70%"].mintime} ~ ${dt["60%~70%"].mintime}`, percent: 60, category: `${category}`},
            { x: 'Top\n70%', y: dt["70%~80%"].stress, range: `${dt["70%~80%"].mintime} ~ ${dt["70%~80%"].mintime}`, percent: 70, category: `${category}`},
            { x: 'Top\n80%', y: dt["80%~90%"].stress, range: `${dt["80%~90%"].mintime} ~ ${dt["80%~90%"].mintime}`, percent: 80, category: `${category}`},
            { x: 'Top\n90%', y: dt["90%~100%"].stress, range: `${dt["90%~100%"].mintime} ~ ${dt["90%~100%"].mintime}`, percent: 90, category: `${category}`},
            { x: 'Top\n100%',y: 0}
        ];});
        userX=1;
        labelText1 = "Least Activity";
        labelText2 = "Most Activity";
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
    else if (category === "Age"){
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
        ];
        userX = 2;
        labelText1 = "";
        labelText2 = "";
      }
    else{
        fetch(`https://riyuna.pythonanywhere.com/histgram?${category.toLowerCase()}_app`)
        .then((response) => response.json())
        .then((dt) => {
        data=[
            { x: 'Top\n1%', y: dt["0%~10%"].stress, range: `${dt["0%~10%"].mintime} ~ ${dt["0%~10%"].mintime}`, percent: 0, category: `${category} Usage`},
            { x: 'Top\n10%', y: dt["10%~20%"].stress, range: `${dt["10%~20%"].mintime} ~ ${dt["10%~20%"].mintime}`, percent: 10, category: `${category} Usage`},
            { x: 'Top\n20%', y: dt["20%~30%"].stress, range: `${dt["20%~30%"].mintime} ~ ${dt["20%~30%"].mintime}`, percent: 20, category: `${category} Usage`},
            { x: 'Top\n30%', y: dt["30%~40%"].stress, range: `${dt["30%~40%"].mintime} ~ ${dt["30%~40%"].mintime}`, percent: 30, category: `${category} Usage`},
            { x: 'Top\n40%', y: dt["40%~50%"].stress, range: `${dt["40%~50%"].mintime} ~ ${dt["40%~50%"].mintime}`, percent: 40, category: `${category} Usage`},
            { x: 'Top\n50%', y: dt["50%~60%"].stress, range: `${dt["50%~60%"].mintime} ~ ${dt["50%~60%"].mintime}`, percent: 50, category: `${category} Usage`},
            { x: 'Top\n60%', y: dt["60%~70%"].stress, range: `${dt["60%~70%"].mintime} ~ ${dt["60%~70%"].mintime}`, percent: 60, category: `${category} Usage`},
            { x: 'Top\n70%', y: dt["70%~80%"].stress, range: `${dt["70%~80%"].mintime} ~ ${dt["70%~80%"].mintime}`, percent: 70, category: `${category} Usage`},
            { x: 'Top\n80%', y: dt["80%~90%"].stress, range: `${dt["80%~90%"].mintime} ~ ${dt["80%~90%"].mintime}`, percent: 80, category: `${category} Usage`},
            { x: 'Top\n90%', y: dt["90%~100%"].stress, range: `${dt["90%~100%"].mintime} ~ ${dt["90%~100%"].mintime}`, percent: 90, category: `${category} Usage`},
            { x: 'Top\n100%',y: 0}
        ];});

        userX=6;
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
            <stop offset="0%" stopColor={theme.colors.stress6} />
            <stop offset="50%" stopColor={theme.colors.stress2} />
            <stop offset="100%" stopColor={theme.colors.stress0} />
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

        {/* Bar */}
        <defs>
        <linearGradient
            id="BarGradient"
            y1="0%"
            y2="100%"
            x1="0%"
            x2="0%"
            gradientUnits="userSpaceOnUse"
        >
            <stop offset="0%" stopColor={theme.colors.stress6} />
            <stop offset="50%" stopColor={theme.colors.stress3} />
            <stop offset="100%" stopColor={theme.colors.stress0} />
        </linearGradient>
        </defs>
        <VictoryBar
          barRatio={category==="Age"?1.15:1.05}
          style={{ 
            labels: {
                fill: "white",
                fontFamily: "Open Sans",
                fontSize: 10,
                backgroundColor: "black"
              },
              data: { fill: 'url(#BarGradient)'},
        }}
          alignment="start"
          labelComponent={<VictoryTooltip
            flyoutStyle={{fill: "black", opacity:0.8}}
            flyoutPadding={({ text }) =>
            text.length > 1
              ? { top: 5, bottom: 5, left: 10, right: 10 }
              : 10}
            pointerOrientation="bottom"
            dx={13}
            textAnchor="start"
            style = {{textAnchor: "start", fill:"white", fontFamily: "open Sans", fontSize: 15, fontweight:500, fontStyle:'bold', lineHeight: 1.25}}
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
        x={5}
        y={-0}
        text='Very Stressed'
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'10px'}}
        />         
        <VictoryLabel
        x={10}
        y={350}
        text='Not Stressed'
        style={{fontFamily: 'Open Sans', fontStyle:'italic', fontWeight:300, fill:theme.colors.blackKS, size:'10px'}}
        /> 
        <div style={{marginBottom: '10px'}}></div>
      </VictoryChart>
      
    )
  };



export default CustomBarChart
