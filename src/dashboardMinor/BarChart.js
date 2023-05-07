import React from "react";
import Plot from 'react-plotly.js';
import {theme} from '../styles/Theme';
import Images from "./Images";



const BarChart = ({color, dash2Data}) => {

    const imgArr =  dash2Data.map((arr) => 
        <img src={`../styles/images/${arr[0]}.png`} width="10px" height="10px" />
    )
    // console.log(arr)

    // const imageYAxis = () => {
    //     return (
    //         dash2Data.map((arr) => 
    //             <img src={`../styles/images/${arr[0]}.png`} width="10px" height="10px" />
    //         )
    //     );
    // }
    // console.log(imageYAxis);

    const customTickFormat = (value) => {
        // return `${value}`+`${value}`;
        <img src={`../styles/images/${value}.png`} width="10px" height="10px" />;
    };

    const data = [{
        x: dash2Data.map((arr) => parseFloat(arr[2])),
        y: dash2Data.map((arr) => arr[0]),  
        // y: <Images dash2Data={dash2Data}/>,
        type: "bar",
        orientation: "h",
        marker: {color: color, width: 0.5,}, //d.color - 얘도 category 별 색상을 가져와야 할 듯
        hoverinfo: 'skip',
    },];


   


    const layout = {
        width: 600,
        height: 300,
        xaxis: {
            title: {text: "Average Stress Level", standoff:20, font: {size: 10, color: theme.colors.grayKS}}, 
            range: [0, 6], 
            tickfont: { size: 11, color:theme.colors.grayKS  },
        },
        margin: {t: 0, },
        pad: {t:0,},
        yaxis: {
            automargin: true,
        //     tickmode: 'array',
        //     tickvals: [2,1,0],
        //     // tickformat: customTickFormat,
        //     ticktext: <Images dash2Data={dash2Data}/>,
        //     // ticktext: ['a','b','c']
        //     // tickformat: customTickFormat,
          },
    };

    return (
        <Plot data = {data} config={{displayModeBar:false}} layout={layout} />
      );

};

export default BarChart;
