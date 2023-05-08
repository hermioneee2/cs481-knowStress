import React from "react";
import Plot from 'react-plotly.js';
import {theme} from '../styles/Theme';



const BarChart = ({color, dash2Data}) => {

    const data = [{
        x: dash2Data.map((arr) => parseFloat(arr[2])),
        y: dash2Data.map((arr) => arr[0]),  
        type: "bar",
        orientation: "h",
        marker: {color: color, height: 0.1, width:0.1,}, //d.color - 얘도 category 별 색상을 가져와야 할 듯
        hoverinfo: 'skip',
        width: 0.6,
        // height: 0.1,
    },];



    const layout = {
        autosize: false,
        width: 600,
        height: 600,
        xaxis: {
            title: {text: "Average Stress Level", standoff:20, font: {size: 10, color: theme.colors.grayKS}}, 
            range: [0, 6], 
            tickfont: { size: 11, color:theme.colors.grayKS  },
            zeroline: false,
        },
        margin: {t: 0, l:0},
        pad: {t:0, l:0},
        // bargap: '10px',
        yaxis: {
            automargin: true,
            showticklabels: false,
            zeroline: false,
            // visible: false,
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
